import React from "react";
import { Image } from "semantic-ui-react";
import homeImg from "../images/homeimg.jpg";
import EventList from "../components/EventList";
import Auth from "../utils/auth";

export default function Home() {
  return (
    <div className="home">
      {Auth.loggedIn() ? (
        <EventList />
      ) : (
        <>
          <div id="home-image">
            <Image src={homeImg} floated="left" />
          </div>
          <EventList />
        </>
      )}
    </div>
  );
}
