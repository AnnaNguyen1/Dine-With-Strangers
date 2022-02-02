import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_EVENTS } from "../../utils/queries";

export default function MyEvents({ userData }) {
  const { data } = useQuery(QUERY_EVENTS);
  const events = data?.events || [];

  const id = userData._id;
  console.log(id);

  console.log(events[0]);

  // const hasEvents = events.length  ? true : false;
  // console.log(hasEvents);

  return (
    <>
      {/**Combatting rendering issue */}
      {userData._id === undefined ? <h3>Loading....</h3> : <h3>working!</h3>}
      {events[0] === undefined ? <h3>Loading....</h3> : <h3>working!</h3>}
    </>
  );
}
