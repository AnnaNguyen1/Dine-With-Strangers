import React from "react";
import { Icon, Form } from "semantic-ui-react";
import { Modal } from "./Modal";
import { Btn } from "./Btn";
import AddressAutocomplete from "./AddressAutocomplete";

export default function EditEvent({ eventData }) {
  console.log("eventData", eventData);

  return (
    <Modal
      trigger={<Btn btnInfo={<Icon name="pencil" />} />}
      content={
        <>
          <div>
            <h3>Edit Event:</h3>
          </div>
          <Form className="form">
            <Form.Input
              fluid
              label="Restaurant Name"
              placeholder="Hungry Mamas"
              name="restaurantName"
              value={eventData.restaurantName}
            />
            <Form.Field>
              <label>Address</label>
              <AddressAutocomplete
                name="restaurantAddress"
                value={eventData.restaurantAddress}
              />
            </Form.Field>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Date and Time of Event</label>
                <input
                  type="datetime-local"
                  className="date-time"
                  name="eventDate"
                  value={eventData.eventDate}
                />
              </Form.Field>
              <Form.Input
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                fluid
                label="Maximum number of attendees"
                placeholder="2"
                name="attendeeLimit"
                //   onChange={handleInputChange}
                value={eventData.attendeeLimit}
              />
            </Form.Group>

            <Form.TextArea
              label="Description"
              placeholder="Tell everyone why you would like to go here...."
              name="description"
              // onChange={handleInputChange}
              value={eventData.description}
            />
            <Form.Field>
              <label>Image of Restaurant</label>
              <input
                type="file"
                accept="image/*"
                name="image"
                //   onChange={handleInputChange}
                value={eventData.image}
              />
            </Form.Field>

            <Form.Button
              disabled={!(eventData.restaurantName && eventData.eventDate)}
            >
              Submit
            </Form.Button>
            {/* {submitted === true ? (
              <Message positive>
                <Message.Header>Event added!</Message.Header>
                <p>
                  Yay! Time to <b>meat</b> new people!
                </p>
              </Message>
            ) : (
              ""
            )} */}
          </Form>
        </>
      }
    />
  );
}
