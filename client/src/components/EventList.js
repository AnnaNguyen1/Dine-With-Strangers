import React, { useEffect, useState } from "react";
import { Card, Image, Button, Modal } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_EVENTS } from "../utils/queries";
import { EventCard } from "./EventCard";

import { ATTEND_EVENT } from "../utils/mutations";
import Auth from "../utils/auth";
import diningImg from "../images/dining.jpg";
// import { Link } from "react-router-dom";
// import LoginForm from "./LoginForm";
import { Btn } from "./Btn";

export default function EventList({ userData }) {
  const { data } = useQuery(QUERY_EVENTS);
  const events = data?.events || [];

  const [attendEvent] = useMutation(ATTEND_EVENT);

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
                    ) : (
                      ""
                    )
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
