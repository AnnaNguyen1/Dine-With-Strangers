import React from "react";
import { EventCard } from "../EventCard";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_EVENTS } from "../../utils/queries";
import { Card, Icon } from "semantic-ui-react";
import { REMOVE_FAVOURITE, ATTEND_EVENT } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { Btn } from "../Btn";
import { PopUp } from "../Popup";

export default function Favourites({ userData }) {
  const { data } = useQuery(QUERY_EVENTS);
  const events = data?.events || [];

  const [removeFavourite] = useMutation(REMOVE_FAVOURITE);
  const [attendEvent] = useMutation(ATTEND_EVENT);

  // function to add eventData to userData.attending

  const handleRemoveFavourite = async (eventId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const response = await removeFavourite({ variables: { _id: eventId } });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }
  };

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
              : "Start favouriting events now! ⭐"}
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
                  btnCards={
                    <div className="btn-align">
                      <div>
                        <PopUp
                          trigger={
                            <div>
                              <Btn
                                btnInfo={<Icon name="heart" color="red" />}
                                onClick={() => handleRemoveFavourite(event._id)}
                              />
                            </div>
                          }
                          content={"Remove Favourite"}
                        />
                      </div>

                      <div>
                        <PopUp
                          trigger={<Btn btnInfo={"Attend!"} />}
                          content="Attend"
                        />
                      </div>
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
