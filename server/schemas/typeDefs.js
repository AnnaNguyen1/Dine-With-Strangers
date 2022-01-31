const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    favourites: [Event]
    attending: [Event]
    events: [Event]
    eventCount: Int
  }

  type Event {
    eventId: ID!
    restaurantName: String
    restaurantAddress: String
    image: String
    eventDate: String
    eventTime: String
    description: String
    attendeeLimit: Int
    state: String
    userId: String
  }

  input InputEvent {
    eventId: ID!
    restaurantName: String
    restaurantAddress: String
    image: String
    eventDate: String
    eventTime: String
    description: String
    attendeeLimit: Int
    state: String
    userId: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    me: User
    events: [Event]
    singleEvent(_id: ID!): Event
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    addEvent(eventData: InputEvent): Event
    deleteEvent(eventId: ID!): Event
    favouriteEvent(eventId: ID!): User
    removeFavourite(eventId: ID!): User
    attendEvent(eventId: ID!): User
    unattendEvent(eventId: ID!): User
  }
`;

module.exports = typeDefs;
