import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
      _id
      firstName
      lastName
      email
      eventCount
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

export const QUERY_EVENTS = gql`
  query allEvents {
    events {
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

export const QUERY_SINGLE_EVENT = gql`
  query singleEvent($_id: ID!) {
    singleEvent(_id: $_id) {
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
