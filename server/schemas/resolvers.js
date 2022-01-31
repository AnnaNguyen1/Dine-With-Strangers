const { User, Event } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // return all events
    events: async () => {
      return await Event.find();
    },

    // return only one event with all attendee names
    event: async (root, { eventId }, context) => {
      if (context.user) {
        return await User.findById({ _id: eventId })
          .populate("events")
          .populate({
            path: "events",
            populate: "attendees",
          });
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // return events by userId
    userEvents: async (root, args, context) => {
      if (context.user) {
        return await User.findById(context.user._id)
          .populate("events")
          .populate({
            path: "events",
            populate: "attendees",
          });
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
      const user = await User.create({ firstName, lastName, email, password });
      const token = signToken(user);

      return { token, user };
    },
    addEvent: async (root, { eventData }, context) => {
      if (context.user) {
        const updatedEvent = await Event.create({
          eventData,
          userId: context.user._id,
        });

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { events: event._id } }
        );

        return { updatedEvent, updatedUser };
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteEvent: async (root, { eventId }, context) => {
      if (context.user) {
        const updatedEvent = await Event.findOneAndDelete({
          _id: eventId,
          userId: context.user._id,
        });

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { events: eventId } },
          { new: true }
        );
        return { updatedEvent, updatedUser };
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    favouriteEvent: async (root, { eventData }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { favourites: eventData } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeFavourite: async (root, { eventId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { favourites: { eventId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    attendEvent: async (root, { eventData }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { attending: eventData } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    unattendEvent: async (root, { eventId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { attending: { eventId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;