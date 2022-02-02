import React, { useEffect, useState } from "react";
import { Card, Image, Button, Modal } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_EVENTS } from "../utils/queries";
import { EventCard } from "./EventCard";
import { saveAttendingIds, getSavedAttendingIds } from "../utils/localStorage";
import { ATTEND_EVENT } from "../utils/mutations";
import Auth from "../utils/auth";
import diningImg from "../images/dining.jpg";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import { Btn } from "./Btn";

export default function EventList() {
  const { data } = useQuery(QUERY_EVENTS);
  const events = data?.events || [];

  // const eventImage = getDefaultImage(events);

  // function getDefaultImage(e) {
  //   console.log(e);
  //   if (!e.image) {
  //     return "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZnJlbmNoJTIwcmVzdGF1cmFudHxlbnwwfHwwfHw%3D&w=1000&q=80";
  //   }
  //   return events.image;
  // }

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
              <div>
                <EventCard
                  key={event._id}
                  image={event.image}
                  restaurantName={event.restaurantName}
                  restaurantAddress={event.restaurantAddress}
                  address={event.address}
                  dateTime={event.eventDate}
                  description={event.description}
                  btnCards={
                    <div className="btns">
                      <Btn btnContent="Attending" />
                      <Btn btnContent="Favourite" />
                    </div>
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
