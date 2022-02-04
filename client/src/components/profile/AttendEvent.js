import React from "react";
import { EventCard } from "../EventCard";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_EVENTS } from "../../utils/queries";
import { Card } from "semantic-ui-react";
import { UNATTEND_EVENT, ADD_FAVOURITE } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { PopUp } from "../Popup";
import { Btn } from "../Btn";

export default function AttendEvent({ userData }) {
  const { data } = useQuery(QUERY_EVENTS);
  const events = data?.events || [];
  console.log(events);

  const userAttending = userData.attending;
  console.log(userAttending);

  // remove from "attending"
  const [unattendEvent] = useMutation(UNATTEND_EVENT, {
    update(cache, { data: { unattendEvent } }) {
      try {
        const { events } = cache.readQuery({ query: QUERY_EVENTS });

        cache.writeQuery({
          query: QUERY_EVENTS,
          data: {
            events: events.filter((event) => event._id != unattendEvent._id),
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });
  const [addToFavourite] = useMutation(ADD_FAVOURITE, {
    update(cache, { data: { favouriteEvent } }) {
      try {
        const { events } = cache.readQuery({ query: QUERY_EVENTS });

        cache.writeQuery({
          query: QUERY_EVENTS,
          data: { events: [...events, favouriteEvent] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleUnattendEvent = async (eventId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const response = await unattendEvent({ variables: { _id: eventId } });
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToFavourites = async (event) => {
    // If event._id === userData.
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const response = await addToFavourite({
        variables: { eventData: { ...event } },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {userAttending === undefined ? (
        <h3>No events currently attending</h3>
      ) : (
        <div>
          <h3>
            {userAttending.length
              ? `You are attending ${
                  userAttending.length === 1
                    ? "1 event"
                    : `${userAttending.length} events`
                }`
              : "No events RSVP'd"}
          </h3>
          <Card.Group centered>
            {userAttending.map((event) => {
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
                        <PopUp
                          trigger={
                            <div>
                              <Btn
                                btnInfo="Unattend"
                                onClick={() => handleUnattendEvent(event._id)}
                              />
                            </div>
                          }
                          content={"Unattend Event"}
                        />
                        <PopUp
                          trigger={
                            <div>
                              <Btn
                                btnInfo="Favourite"
                                onClick={() => handleAddToFavourites(event)}
                              />
                            </div>
                          }
                          content={"Move to Favourites"}
                        />
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
