import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_EVENTS } from "../../utils/queries";
import { DELETE_EVENT } from "../../utils/mutations";
import { EventCard } from "../EventCard";
import { Card } from "semantic-ui-react";
import { Btn } from "../Btn";
import Auth from "../../utils/auth";
import EditEvent from "../EditEvent";

export default function MyEvents({ userData }) {
  const { data } = useQuery(QUERY_EVENTS);
  const events = data?.events || [];

  const userId = userData._id;

  const filteredEvents = getEventsWithUserId(events, userId);

  const [deleteEvent] = useMutation(DELETE_EVENT, {
    update(cache, { data: { deleteEvent } }) {
      try {
        const { events } = cache.readQuery({ query: QUERY_EVENTS });

        cache.writeQuery({
          query: QUERY_EVENTS,
          data: {
            events: events.filter((event) => event._id !== deleteEvent._id),
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleDeleteEvent = async (eventId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const response = await deleteEvent({ variables: { _id: eventId } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/**Combatting rendering issue */}
      {userId === undefined ? <h3>Loading...</h3> : null}
      {filteredEvents[0] === undefined ? (
        <h3>You are not hosting any events.</h3>
      ) : (
        <>
          <h3>Events you are hosting:</h3>
          <Card.Group centered>
            {filteredEvents.map((event) => {
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
                        <EditEvent eventData={event} />
                        <Btn
                          btnInfo="Delete Event"
                          btnColor="red"
                          onClick={() => handleDeleteEvent(event._id)}
                        />
                      </div>
                    }
                  />
                </div>
              );
            })}
          </Card.Group>
        </>
      )}
    </>
  );
}

function getEventsWithUserId(events, userId) {
  if (!userId) {
    return [];
  }
  return events.filter((e) => e.userId === userId);
}
