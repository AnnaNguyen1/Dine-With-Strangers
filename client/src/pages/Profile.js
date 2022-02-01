import React from "react";
import { Tab } from "../components/Tab";
import { EventForm } from "../components/profile/EventForm";
import Favourites from "../components/profile/Favourites";
import AttendEvent from "../components/profile/AttendEvent";
import MyEvents from "../components/profile/MyEvents";
import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";

export default function Profile() {
  const { data } = useQuery(QUERY_ME);
  const me = data?.me || [];

  return (
    <div className="profile">
      <div className="tabs">
        <Tab
          attending={<AttendEvent userData={me} />}
          favourites={<Favourites userData={me} />}
          events={<MyEvents userData={me} />}
          addevent={<EventForm userData={me} />}
        />
      </div>
    </div>
  );
}
