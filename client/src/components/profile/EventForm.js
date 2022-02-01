import React, { useState } from "react";
import { Form as Sform } from "semantic-ui-react";
import AddressAutocomplete from "../AddressAutocomplete";
import { ADD_EVENT } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

export function EventForm({ _id }) {
  const [events, setEvents] = useState({
    restaurantName: "",
    restaurantAddress: "",
    image: "",
    eventDate: "",
    description: "",
    attendeeLimit: 0,
  });
  const [address, setAddress] = useState();

  const [addEvent] = useMutation(ADD_EVENT);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEvents({ ...events, [name]: value });
  };

  const setAddress2 = (add) => {
    //setEvents({ ...events, restaurantAddress: address });
    setAddress(add);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    try {
      const { data } = addEvent({
        variables: {
          eventData: { ...events, _id, restaurantAddress: address },
        },
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    setEvents({
      restaurantName: "",
      restaurantAddress: "",
      image: "",
      eventDate: "",
      description: "",
      attendeeLimit: 0,
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
          value={events.restaurantName}
        />
        <Sform.Field>
          <label>Address</label>
          <AddressAutocomplete
            name="restaurantAddress"
            // onChange={handleInputChange}
            // value={events.restaurantAddress}
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
              value={events.eventDate}
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
            value={events.attendeeLimit}
          />
        </Sform.Group>

        <Sform.TextArea
          label="Description"
          placeholder="Tell everyone why you would like to go here...."
          name="description"
          onChange={handleInputChange}
          value={events.description}
        />
        <Sform.Field>
          <label>Image of Restaurant</label>
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleInputChange}
            value={events.image}
          />
        </Sform.Field>

        <Sform.Button>Submit</Sform.Button>
      </Sform>
    </>
  );
}
