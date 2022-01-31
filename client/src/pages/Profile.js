import React from "react";
import { Tab } from "../components/Tab";

export default function Profile() {
  return (
    <div className="profile">
      <div className="tabs">
        <Tab
          attending={`attending`}
          favourites={`favourites`}
          events={`events`}
          addevent={`add event`}
        />
      </div>
    </div>
  );
}
