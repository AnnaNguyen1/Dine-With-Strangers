import React, { useState, useContext } from "react";

export const EventContext = React.createContext();

export const anEvent = () => useContext(EventContext);

export default function EventProvider({ children }) {
  const [events, setEvents] = useState({
    favourites: [],
    attending: [],
  });

  const addFavourite = (events) => {
    setEvents([...favourites, events]);
  };
}
