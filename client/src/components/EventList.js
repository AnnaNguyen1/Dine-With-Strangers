import React, { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { QUERY_EVENTS } from "../utils/queries";
import { EventCard } from "./EventCard";
import { saveAttendingIds, getSavedAttendingIds } from "../utils/localStorage";
import { ATTEND_EVENT } from "../utils/mutations";

export default function EventList() {
  const { data } = useQuery(QUERY_EVENTS);
  const events = data?.events || [];
  console.log("events", events);

  const [saveAttendingEvent] = useMutation(ATTEND_EVENT);
  // data to be saved
  const [eventData, setEventData] = useState("");

  //saved favourites
  const [savedAttendingEvent, setsavedAttendingEvent] = useState("");

  useEffect(() => {
    return () => saveAttendingIds(savedAttendingEvent);
  });

  // handle data being passed to state to save
  const handleFormSubmit = async (event) => {};
  // handle what is being saved to database

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
  );
}
