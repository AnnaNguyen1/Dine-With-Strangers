import React from "react";
import { Card as Scard, Image } from "semantic-ui-react";

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
          <span className="address">{restaurantAddress}</span>
          <span className="date">{dateTime}</span>
        </Scard.Meta>
        <Scard.Description>{description}</Scard.Description>
      </Scard.Content>
      <Scard.Content extra>{btnCards}</Scard.Content>
    </Scard>
  );
}
