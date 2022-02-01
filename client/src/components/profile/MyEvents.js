import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_EVENTS } from "../../utils/queries";

export default function MyEvents({ userData }) {
  const { data } = useQuery(QUERY_EVENTS);
  const events = data?.events || [];

  return (
    <>
      <h3></h3>
    </>
  );
}
