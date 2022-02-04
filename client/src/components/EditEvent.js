import React, { useState } from "react";
import { Icon, Form } from "semantic-ui-react";
import { Modal } from "./Modal";
import { Btn } from "./Btn";

export default function EditEvent({ eventData }) {
  console.log("eventData", eventData);

  const [openModal, setOpenModal] = useState(false);
  const [currentEventData, setCurrentEventData] = useState({
    restaurantName: eventData.restaurantName,
    restaurantAddress: eventData.restaurantAddress,
    image: "",
    eventDate: eventData.eventDate,
    description: eventData.description,
    attendeeLimit: eventData.attendeeLimit,
  });

  console.log("currentEventData", currentEventData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCurrentEventData({ ...eventData, [name]: value });
  };

  return (
    <Modal
      trigger={<Btn btnInfo={<Icon name="pencil" />} />}
      header="Edit Event"
      onOpen={() => setOpenModal(true)}
      open={openModal}
      content={
        <>
          <Form className="form">
            <Form.Input
              fluid
              label="Restaurant Name"
              placeholder="Hungry Mamas"
              name="restaurantName"
              value={currentEventData.restaurantName}
              onChange={handleInputChange}
            />
            <Form.Input
              fluid
              label="Restaurant Address"
              placeholder="Hungry Mamas"
              name="restaurantAddress"
              value={currentEventData.restaurantAddress}
              onChange={handleInputChange}
            />
            <Form.Group widths="equal">
              <Form.Field>
                <label>Date and Time of Event</label>
                <input
                  type="datetime-local"
                  className="date-time"
                  name="eventDate"
                  value={currentEventData.eventDate}
                  onChange={handleInputChange}
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
                value={currentEventData.attendeeLimit}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.TextArea
              label="Description"
              placeholder="Tell everyone why you would like to go here...."
              name="description"
              // onChange={handleInputChange}
              value={currentEventData.description}
              onChange={handleInputChange}
            />
            <Form.Field>
              <label>Image of Restaurant</label>
              <input
                type="file"
                accept="image/*"
                name="image"
                //   onChange={handleInputChange}
                value={currentEventData.image}
                onChange={handleInputChange}
              />
            </Form.Field>
            <div className="btn-bw">
              <Btn
                disabled={
                  !(
                    currentEventData.restaurantName &&
                    currentEventData.eventDate
                  )
                }
                btnInfo="Save Changes"
              />
              <Btn onClick={() => setOpenModal(false)} btnInfo="Cancel" />
            </div>

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
