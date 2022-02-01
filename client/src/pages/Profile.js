import React from "react";
import { Tab } from "../components/Tab";
import { EventForm } from "../components/EventForm";
import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";

export default function Profile() {
  const { data } = useQuery(QUERY_ME);
  const me = data?.me || [];
  console.log("me", me);

  return (
    <div className="profile">
      <div className="tabs">
        <Tab
          attending={`attending`}
          favourites={`favourites`}
          events={`events`}
          addevent={<EventForm userData={me} />}
        />
      </div>
    </div>
  );
}
