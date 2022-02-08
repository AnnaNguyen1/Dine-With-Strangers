import React, { useState } from "react";
import { Icon, Form } from "semantic-ui-react";
import { Modal } from "./Modal";
import { Btn } from "./Btn";
import { EDIT_EVENT } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { QUERY_EVENTS } from "../utils/queries";

export default function EditEvent({ eventData }) {
  const [openModal, setOpenModal] = useState(false);
  const [editEvent] = useMutation(EDIT_EVENT, {
    update(cache, { data: { editEvent } }) {
      try {
        const { events } = cache.readQuery({ query: QUERY_EVENTS });

        const newEvents = events.map((event) => {
          if (event._id === editEvent._id) {
            return editEvent;
          }
          return event;
        });

        cache.writeQuery({
          query: QUERY_EVENTS,
          data: { events: newEvents },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const [currentEventData, setCurrentEventData] = useState({
    restaurantName: eventData.restaurantName,
    restaurantAddress: eventData.restaurantAddress,
    eventDate: eventData.eventDate,
    description: eventData.description,
    attendeeLimit: eventData.attendeeLimit,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCurrentEventData({ ...eventData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await editEvent({
        variables: {
          eventData: {
            ...eventData,
            ...currentEventData,
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
    setOpenModal(false);
  };
  return (
    <Modal
      trigger={<Btn btnInfo={<Icon name="pencil" />} />}
      header="Edit Event"
      onOpen={() => setOpenModal(true)}
      open={openModal}
      content={
        <>
          <Form className="form" size="small" onSubmit={handleFormSubmit}>
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
                value={currentEventData.attendeeLimit}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.TextArea
              label="Description"
              placeholder="Tell everyone why you would like to go here...."
              name="description"
              value={currentEventData.description}
              onChange={handleInputChange}
            />
            {/* <Form.Field>
              <label>Image of Restaurant</label>
              <input
                type="file"
                accept="image/*"
                name="image"
                value={currentEventData.image}
                onChange={handleInputChange}
              />
            </Form.Field> */}
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
          </Form>
        </>
      }
    />
  );
}
