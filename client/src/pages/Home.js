import React from "react";
import { Image } from "semantic-ui-react";
import homeImg from "../images/homeimg.jpg";
import EventList from "../components/EventList";
import Auth from "../utils/auth";

export default function Home() {
  return (
    <main className="home">
      {Auth.loggedIn() ? (
        <EventList />
      ) : (
        <>
          <div id="home-image">
            <Image src={homeImg} />
          </div>
          <div id="home-sub-header">
            <h2>
              Looking to meet new people who share the same tastes as you?
            </h2>
            <h5>
              Find events near you and let the host know you are attending!
            </h5>
          </div>
          <div id="event-list">
            <EventList />
          </div>
        </>
      )}
    </main>
  );
}
