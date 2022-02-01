import React from "react";
import { Card } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { QUERY_EVENTS } from "../utils/queries";
import { EventCard } from "./EventCard";

export default function EventList() {
  const { data } = useQuery(QUERY_EVENTS);
  const events = data?.events || [];
  console.log("events", events);

  return (
    <div>
      <div className="findEvents">
        <h2>
          {events.length
            ? `There ${
                events.length === 1
                  ? "is 1 event near you!"
                  : `are ${events.length} events near you!`
              }`
            : "There are no events listed"}
        </h2>
      </div>

      <Card.Group centered>
        {events.map((event) => {
          return (
            <EventCard
              key={event._id}
              image={event.image}
              restaurantName={event.restaurantName}
              address={event.address}
              dateTime={event.eventDate}
              description={event.description}
            />
          );
        })}
      </Card.Group>
    </div>
  );
}
