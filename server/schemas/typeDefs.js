const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    favourites: [Event]
    attending: [Event]
    eventCount: Int
  }

  #  type Address {
  #    address1: string
  #    address2: string
  #   suburb: string
  #   postcode: string
  #   state: string
  #   country: string;
  # }

  type Event {
    _id: ID
    restaurantName: String
    restaurantAddress: String
    image: String
    eventDate: String
    description: String
    attendeeLimit: String
    userId: String
  }

  input InputEvent {
    restaurantName: String
    restaurantAddress: String
    image: String
    eventDate: String
    description: String
    attendeeLimit: String
    userId: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    me: User
    users: User
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
    deleteEvent(_id: ID!): Event
    favouriteEvent(_id: ID!): User
    removeFavourite(_id: ID!): User
    attendEvent(_id: ID!): User
    unattendEvent(_id: ID!): User
  }
`;

module.exports = typeDefs;
