const { User, Event } = require("../models");
const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (root, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("events");
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    users: async () => {
      return User.find({});
    },

    // return all events
    events: async () => {
      return await Event.find();
    },

    // return only one event with all attendee names
    singleEvent: async (root, { _id }, context) => {
      if (context.user) {
        return await User.findById({ _id: _id }).populate("events");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    login: async (root, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No profile found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Login failed");
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (root, { firstName, lastName, email, password }) => {
      let user = await User.findOne({ email });
      console.log(user);
      if (user) {
        throw new UserInputError("Email already exists", {
          errors: {
            email: "Login!",
          },
        });
      }

      user = await User.create({ firstName, lastName, email, password });
      console.log(user);
      const token = signToken(user);
      console.log(token);
      return { token, user };
    },
    addEvent: async (root, { eventData }, context) => {
      if (context.user) {
        const updatedEvent = await Event.create({
          ...eventData,
          userId: context.user._id,
        });

        return updatedEvent;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteEvent: async (root, { _id }, context) => {
      const existingEvent = { _id };
      if (context.user) {
        const updatedEvent = await Event.findOneAndDelete({
          _id: existingEvent,
        });

        return updatedEvent;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    favouriteEvent: async (root, { eventData }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $push: { favourites: eventData },
          },
          { new: true }
        );

        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeFavourite: async (root, { _id: eventId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { favourites: { _id: eventId } } },
          { new: true }
        );
        console.log(updatedUser);
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    attendEvent: async (root, { eventData }, context) => {
      const newEvent = { eventData };
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { attending: newEvent } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    unattendEvent: async (root, { _id: eventId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { attending: { _id: eventId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
