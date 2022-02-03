import React from "react";
import { Card, Image } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { QUERY_EVENTS } from "../utils/queries";
import { EventCard } from "./EventCard";
import Auth from "../utils/auth";
import diningImg from "../images/dining.jpg";

import { Btn } from "./Btn";

export default function EventList({ userData }) {
  const { data } = useQuery(QUERY_EVENTS);
  const events = data?.events || [];

  return (
    <div>
      {Auth.loggedIn() ? (
        <div id="home-image">
          <Image src={diningImg} />
        </div>
      ) : null}
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

      {events[0] === undefined ? (
        <h3>--</h3>
      ) : (
        <Card.Group centered>
          {events.map((event) => {
            return (
              <div key={event._id}>
                <EventCard
                  image={event.image}
                  restaurantName={event.restaurantName}
                  restaurantAddress={event.restaurantAddress}
                  address={event.address}
                  dateTime={event.eventDate}
                  description={event.description}
                  btnCards={
                    Auth.loggedIn() ? (
                      <div className="btns">
                        <Btn btnInfo="Attending" />
                        <Btn btnInfo="Favourite" />
                      </div>
                    ) : null
                  }
                />
              </div>
            );
          })}
        </Card.Group>
      )}
    </div>
  );
}

// onClick={() => {
//   addToFavouritesMutation({variables: event})
// }}
