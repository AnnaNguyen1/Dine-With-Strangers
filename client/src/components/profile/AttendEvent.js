import React from "react";
import { EventCard } from "../EventCard";
import { useQuery } from "@apollo/client";
import { QUERY_EVENTS } from "../../utils/queries";
import { Card } from "semantic-ui-react";

export default function AttendEvent({ userData }) {
  const { data } = useQuery(QUERY_EVENTS);
  const events = data?.events || [];
  console.log(events);

  const userAttending = userData.attending;
  console.log(userAttending);

  return (
    <>
      {userAttending === undefined ? (
        <h3>No events currently attending</h3>
      ) : (
        <div>
          <h3>
            {userAttending.length
              ? `You have favourited ${
                  userAttending.length === 1
                    ? "1 event"
                    : `${userAttending.length} events`
                }`
              : "Start favouriting events now!"}
          </h3>
          <Card.Group centered>
            {userAttending.map((event) => {
              return (
                <EventCard
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
        </div>
      )}
    </>
  );
}
