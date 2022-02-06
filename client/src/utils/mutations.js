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
    addEvent(eventData: $eventData) {
      _id
      restaurantName
      restaurantAddress
      image
      eventDate
      description
      attendeeLimit
      userId
    }
  }
`;

export const EDIT_EVENT = gql`
  mutation editEvent($eventData: InputEvent) {
    editEvent(eventData: $eventData) {
      _id
      restaurantName
      restaurantAddress
      image
      eventDate
      description
      attendeeLimit
      userId
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation deleteEvent($_id: ID!) {
    deleteEvent(_id: $_id) {
      _id
      restaurantName
      restaurantAddress
      image
      eventDate
      description
      attendeeLimit
      userId
    }
  }
`;

export const ADD_FAVOURITE = gql`
  mutation favouriteEvent($eventData: InputEvent) {
    favouriteEvent(eventData: $eventData) {
      _id
      firstName
      lastName
      email
      favourites {
        _id
        restaurantName
        restaurantAddress
        image
        eventDate
        description
        attendeeLimit
        userId
      }
    }
  }
`;

export const REMOVE_FAVOURITE = gql`
  mutation removeFavourite($_id: ID!) {
    removeFavourite(_id: $_id) {
      _id
      firstName
      lastName
      email
      favourites {
        _id
        restaurantName
        restaurantAddress
        image
        eventDate
        description
        attendeeLimit
        userId
      }
    }
  }
`;

export const ATTEND_EVENT = gql`
  mutation attendEvent($eventData: InputEvent) {
    attendEvent(eventData: $eventData) {
      _id
      firstName
      lastName
      email
      attending {
        _id
        restaurantName
        restaurantAddress
        image
        eventDate
        description
        attendeeLimit
        userId
      }
    }
  }
`;

export const UNATTEND_EVENT = gql`
  mutation unattendEvent($_id: ID!) {
    unattendEvent(_id: $_id) {
      _id
      firstName
      lastName
      email
      attending {
        _id
        restaurantName
        restaurantAddress
        image
        eventDate
        description
        attendeeLimit
        userId
      }
    }
  }
`;
