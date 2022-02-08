import React, { useState } from "react";
import { EventCard } from "../EventCard";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_EVENTS, QUERY_ME } from "../../utils/queries";
import { Card, Icon } from "semantic-ui-react";
import { REMOVE_FAVOURITE, ATTEND_EVENT } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { Btn } from "../Btn";
import { PopUp } from "../Popup";
import { Modal } from "../Modal";

export default function Favourites({ userData }) {
  const { data } = useQuery(QUERY_EVENTS);
  const events = data?.events || [];
  const userFavourites = userData.favourites;
  const userEventsAttending = userData.attending;

  const [alreadyAttendingMsg, setAlreadyAttendingMsg] = useState(false);

  const [removeFavourite] = useMutation(REMOVE_FAVOURITE, {
    update(cache, { data: { removeFavourite } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: {
            me: userData.favourites.filter(
              (userFavourites) =>
                userData.favourites._id !== removeFavourite._id
            ),
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });
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

  const handleRemoveFavourite = async (eventId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const response = await removeFavourite({ variables: { _id: eventId } });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAttendEvent = async (event) => {
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
        const removeFavResponse = await removeFavourite({
          variables: { _id: event._id },
        });
        console.log(response, removeFavResponse);
      } catch (err) {
        console.error(err);
      }
    } else {
      setAlreadyAttendingMsg(true);
    }
  };

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
              : "Start favouriting events now! ⭐"}
          </h3>
          <Card.Group centered>
            {userFavourites.map((event) => {
              return (
                <div key={event._id}>
                  <EventCard
                    id={event._id}
                    image={event.image}
                    restaurantName={event.restaurantName}
                    restaurantAddress={event.restaurantAddress}
                    address={event.address}
                    dateTime={event.eventDate}
                    description={event.description}
                    btnCards={
                      <div className="btn-align">
                        <div>
                          <PopUp
                            trigger={
                              <div>
                                <Btn
                                  btnInfo={<Icon name="heart" color="red" />}
                                  onClick={() =>
                                    handleRemoveFavourite(event._id)
                                  }
                                />
                              </div>
                            }
                            content={"Remove Favourite"}
                          />
                        </div>

                        <div>
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
                              content="Attend"
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
                              content="Move to Attending"
                            />
                          )}
                        </div>
                      </div>
                    }
                  />
                </div>
              );
            })}
          </Card.Group>
        </div>
      )}
    </>
  );
}
