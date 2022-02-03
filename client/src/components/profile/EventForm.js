import React, { useState } from "react";
import { Form as Sform, Message } from "semantic-ui-react";
import AddressAutocomplete from "../AddressAutocomplete";
import { ADD_EVENT } from "../../utils/mutations";
import { QUERY_EVENTS } from "../../utils/queries";

import { useMutation } from "@apollo/client";

export function EventForm({ _id }) {
  const [event, setEvent] = useState({
    restaurantName: "",
    restaurantAddress: "",
    image: "",
    eventDate: "",
    description: "",
    attendeeLimit: "",
  });
  const [address, setAddress] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [addEvent] = useMutation(ADD_EVENT, {
    update(cache, { addEvent }) {
      const { events } = cache.readQuery({ query: QUERY_EVENTS });

      cache.writeQuery({
        query: QUERY_EVENTS,
        data: { events: [...events, addEvent] },
      });
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEvent({ ...event, [name]: value });
  };

  const setAddress2 = (add) => {
    //setevent({ ...events, restaurantAddress: address });
    setAddress(add);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addEvent({
        variables: {
          eventData: { ...event, _id, restaurantAddress: address },
        },
      });
      setSubmitted(true);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    setEvent({
      restaurantName: "",
      restaurantAddress: "",
      image: "",
      eventDate: "",
      description: "",
      attendeeLimit: "",
      setAddress2: "",
    });
  };

  return (
    <>
      <div>
        <h3>Would you like to host an event? Enter the details below:</h3>
      </div>
      <Sform className="form" onSubmit={handleFormSubmit}>
        <Sform.Input
          fluid
          label="Restaurant Name"
          placeholder="Hungry Mamas"
          name="restaurantName"
          onChange={handleInputChange}
          value={event.restaurantName}
        />
        <Sform.Field>
          <label>Address</label>
          <AddressAutocomplete
            name="restaurantAddress"
            // onChange={handleInputChange}
            // value={event.restaurantAddress}
            setAddress2={setAddress2}
          />
        </Sform.Field>
        <Sform.Group widths="equal">
          <Sform.Field>
            <label>Date and Time of Event</label>
            <input
              type="datetime-local"
              className="date-time"
              name="eventDate"
              onChange={handleInputChange}
              value={event.eventDate}
            />
          </Sform.Field>
          <Sform.Input
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            fluid
            label="Maximum number of attendees"
            placeholder="2"
            name="attendeeLimit"
            onChange={handleInputChange}
            value={event.attendeeLimit}
          />
        </Sform.Group>

        <Sform.TextArea
          label="Description"
          placeholder="Tell everyone why you would like to go here...."
          name="description"
          onChange={handleInputChange}
          value={event.description}
        />
        <Sform.Field>
          <label>Image of Restaurant</label>
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleInputChange}
            value={event.image}
          />
        </Sform.Field>

        <Sform.Button
          disabled={!(event.restaurantName && setAddress2 && event.eventDate)}
        >
          Submit
        </Sform.Button>
        {submitted === true ? (
          <Message positive>
            <Message.Header>Event added!</Message.Header>
            <p>
              Yay! Time to <b>meat</b> new people!
            </p>
          </Message>
        ) : (
          ""
        )}
      </Sform>
    </>
  );
}
