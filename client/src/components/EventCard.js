import React from "react";
import { Card as Scard, Image } from "semantic-ui-react";
import { FormatDate } from "../utils/helpers";

export function EventCard({
  image,
  restaurantName,
  restaurantAddress,
  dateTime,
  description,
  btnCards,
}) {
  return (
    <Scard className="event-card">
      <Image src={image} wrapped ui={false} />
      <Scard.Content>
        <Scard.Header>{restaurantName}</Scard.Header>
        <Scard.Meta>
          <span className="date">{FormatDate(dateTime)}</span>
        </Scard.Meta>
        <Scard.Meta>
          <span className="address">{restaurantAddress}</span>
        </Scard.Meta>
        <Scard.Description>{description}</Scard.Description>
      </Scard.Content>
      <Scard.Content extra>{btnCards}</Scard.Content>
    </Scard>
  );
}
