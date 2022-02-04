import React from "react";
import { Tab } from "../components/Tab";
import { EventForm } from "../components/profile/EventForm";
import Favourites from "../components/profile/Favourites";
import AttendEvent from "../components/profile/AttendEvent";
import MyEvents from "../components/profile/MyEvents";
import EventList from "../components/EventList";
import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import Home from "./Home";

export default function Profile() {
  const { data } = useQuery(QUERY_ME);
  const me = data?.me || [];

  return (
    <div>
      {Auth.loggedIn() ? (
        <div className="profile">
          <h2 className="heading-profile">
            Hi {me.firstName}!
            <span className="lobster">
              {" "}
              Ready to 🍷 and dine with people you have never met before?{" "}
            </span>
          </h2>

          <div className="tabs">
            <Tab
              favourites={<Favourites userData={me} />}
              attending={<AttendEvent userData={me} />}
              events={<MyEvents userData={me} />}
              addevent={<EventForm userData={me} />}
            />
          </div>
          <EventList userData={me} />
        </div>
      ) : (
        <Home />
      )}
    </div>
  );
}
