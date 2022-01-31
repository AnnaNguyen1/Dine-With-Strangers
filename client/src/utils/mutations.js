import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const ADD_EVENT = gql`
  mutation addEvent($eventData: InputEvent) {
    addEvent(eventData: $InputEvent) {
      eventId
      restaurantName
      restaurantAddress
      image
      eventDate
      eventTime
      description
      attendeeLimit
      state
      userId
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation deleteEvent($eventId: ID!) {
    deleteEvent(eventId: $eventId) {
      eventId
      restaurantName
      restaurantAddress
      image
      eventDate
      eventTime
      description
      attendeeLimit
      state
      userId
    }
  }
`;

export const ADD_FAVOURITE = gql`
  mutation addFavourite($eventId: eventId) {
    addFavourite(eventId: $eventId) {
      eventId
      restaurantName
      restaurantAddress
      image
      eventDate
      eventTime
      description
      attendeeLimit
      state
      userId
    }
  }
`;
