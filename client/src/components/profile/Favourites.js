import React from "react";
import { EventCard } from "../EventCard";
import { useQuery } from "@apollo/client";
import { QUERY_EVENTS } from "../../utils/queries";
import { Card } from "semantic-ui-react";

export default function Favourites({ userData }) {
  const { data } = useQuery(QUERY_EVENTS);
  const events = data?.events || [];

  const userFavourites = userData.favourites;

  return (
    <>
      {userFavourites === undefined ? (
        <h3> No favourites so far! </h3>
      ) : (
        <div>
          <h3>
            {userFavourites.length
              ? `You have favourited ${
                  userFavourites.length === 1
                    ? "1 event"
                    : `${userFavourites.length} events`
                }`
              : "Start favouriting events now!"}
          </h3>
          <Card.Group centered>
            {userFavourites.map((event) => {
              console.log(event);
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
