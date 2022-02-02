import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_EVENTS } from "../../utils/queries";
import { EventCard } from "../EventCard";
import { Card } from "semantic-ui-react";


export default function MyEvents({ userData }) {
  const { data } = useQuery(QUERY_EVENTS);
  const events = data?.events || [];

  const userId = userData._id;

  const filteredEvents = getEventsWithUserId(events, userId);
  console.log("filtered", filteredEvents);

  return (
    <>
      {/**Combatting rendering issue */}
      {userData._id === undefined ? <h3>Loading....</h3> : <h3>working!</h3>}
      {events[0] === undefined ? (
        <h3>Loading....</h3>
      ) : (
        <Card.Group centered>
          {filteredEvents.map((event) => {
            return (
              <EventCard
                key={event._id}
                id={event._id}
                image={event.image}
                restaurantName={event.restaurantName}
                restaurantAddress={event.restaurantAddress}
                address={event.address}
                dateTime={event.eventDate}
                description={event.description}
              />
            );
          })}
        </Card.Group>
      )}
    </>
  );
}

function getEventsWithUserId(events, userId) {
  if (!userId) {
    return [];
  }
  return events.filter((e) => e.userId === userId);
}

