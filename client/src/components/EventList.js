import React, { useState } from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_EVENTS, QUERY_ME } from "../utils/queries";
import { EventCard } from "./EventCard";
import Auth from "../utils/auth";
import diningImg from "../images/dining.jpg";
import { PopUp } from "./Popup";
import { Modal } from "./Modal";
import { Btn } from "./Btn";
import { ATTEND_EVENT, ADD_FAVOURITE } from "../utils/mutations";

export default function EventList({ userData }) {
  const { data } = useQuery(QUERY_EVENTS);
  const events = data?.events || [];
  const userEventsAttending = userData.attending;
  const userEventsFavourited = userData.favourites;

  // AttendEvent
  const [alreadyAttendingMsg, setAlreadyAttendingMsg] = useState(false);
  const [alreadyFavouritedMsg, setAlreadyFavouritedMsg] = useState(false);

  const [attendEvent] = useMutation(ATTEND_EVENT, {
    update(cache, { data: { attendEvent } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });

        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { attending: [...events, attendEvent] } },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const [addToFavourite] = useMutation(ADD_FAVOURITE, {
    update(cache, { data: { favouriteEvent } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });

        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { favourites: [...events, favouriteEvent] } },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleAttendEvent = async (event) => {
    console.log("attendEventdata", event);
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    // Check to see if the event.Id already exists in the user's attending array
    const checkAlreadyAttending = userEventsAttending.some(
      (ele) => ele._id === event._id
    );

    if (checkAlreadyAttending !== true) {
      try {
        const response = await attendEvent({
          variables: { eventData: { ...event } },
        });
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    } else {
      setAlreadyAttendingMsg(true);
    }
  };

  const handleAddToFavourites = async (event) => {
    const checkAlreadyFavourited = userEventsFavourited.some(
      (ele) => ele._id === event._id
    );

    if (checkAlreadyFavourited !== true) {
      try {
        const response = await addToFavourite({
          variables: { eventData: { ...event } },
        });
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    } else {
      setAlreadyFavouritedMsg(true);
    }
  };

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
                        {alreadyFavouritedMsg === true ? (
                          <PopUp
                            trigger={
                              <div>
                                <Modal
                                  size="tiny"
                                  trigger={
                                    <Btn
                                      btnInfo={<Icon name="heart outline" />}
                                    />
                                  }
                                  content="You have already favourited  this event! "
                                  header="Oops!"
                                />
                              </div>
                            }
                            content="Add to favourites"
                          />
                        ) : (
                          <PopUp
                            trigger={
                              <div>
                                <Btn
                                  btnInfo={<Icon name="heart outline" />}
                                  onClick={() => handleAddToFavourites(event)}
                                />
                              </div>
                            }
                            content="Add to favourites"
                          />
                        )}
                        {alreadyAttendingMsg === true ? (
                          <PopUp
                            trigger={
                              <div>
                                <Modal
                                  size="tiny"
                                  trigger={<Btn btnInfo="Attend!" />}
                                  content="You are already attending this event! "
                                  header="Oops!"
                                />
                              </div>
                            }
                            content="Attend Event"
                          />
                        ) : (
                          <PopUp
                            trigger={
                              <div>
                                <Btn
                                  btnInfo={"Attend!"}
                                  onClick={() => handleAttendEvent(event)}
                                />
                              </div>
                            }
                            content="Attend Event"
                          />
                        )}
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
