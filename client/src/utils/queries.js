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
      attending {
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
  }
`;

export const QUERY_EVENTS = gql`
  query allEvents {
    events {
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

export const QUERY_SINGLE_EVENT = gql`
  query singleEvent($eventId: ID!) {
    singleEvent(eventId: $eventId) {
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
