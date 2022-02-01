import React from "react";
import EventCard from "./EventCard";

export default function Favourites() {
  return (
    <Card>
      <EventCard
        key="hello"
        image=""
        restaurant="restaurant"
        dateTime="11pm"
        description="test"
      />
    </Card>
  );
}
