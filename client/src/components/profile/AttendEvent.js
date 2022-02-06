import React from "react";
import { EventCard } from "../EventCard";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_EVENTS, QUERY_ME } from "../../utils/queries";
import { Card, Icon } from "semantic-ui-react";
import { UNATTEND_EVENT, ADD_FAVOURITE } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { PopUp } from "../Popup";
import { Btn } from "../Btn";

export default function AttendEvent({ userData }) {
  const { data } = useQuery(QUERY_EVENTS);
  const events = data?.events || [];
  console.log(events);

  const userAttending = userData.attending;

  // remove from "attending"
  const [unattendEvent] = useMutation(UNATTEND_EVENT, {
    update(cache, { data: { unattendEvent } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        console.log({ me });
        cache.writeQuery({
          query: QUERY_ME,
          data: {
            me: userData.attending.filter(
              (userAttending) => userData.attending._id !== unattendEvent._id
            ),
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

  const handleUnattendEvent = async (eventId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const response = await unattendEvent({ variables: { _id: eventId } });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToFavourites = async (event) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    // First add to favourites array
    try {
      const response = await addToFavourite({
        variables: { eventData: { ...event } },
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }

    // Then remove from attending array
    try {
      const response = await unattendEvent({ variables: { _id: event._id } });
      console.log(response);
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
                                btnInfo={<Icon name="heart outline" />}
                                onClick={() => handleAddToFavourites(event)}
                              />
                            </div>
                          }
                          content="Move to Favourites"
                        />
                        <PopUp
                          trigger={
                            <div>
                              <Btn
                                basic={true}
                                btnColor="orange"
                                btnInfo="Unattend"
                                onClick={() => handleUnattendEvent(event._id)}
                              />
                            </div>
                          }
                          content="Unattend Event"
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
