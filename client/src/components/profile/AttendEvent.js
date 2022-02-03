import React from "react";
import { EventCard } from "../EventCard";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_EVENTS } from "../../utils/queries";
import { Card } from "semantic-ui-react";
import { UNATTEND_EVENT } from "../../utils/mutations";
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
  const [unattendEvent] = useMutation(UNATTEND_EVENT);

  const handleUnattendEvent = async (eventId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const response = await unattendEvent({ variables: { _id: eventId } });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
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
                    </div>
                  }
                />
              );
            })}
          </Card.Group>
        </div>
      )}
    </>
  );
}
