import React from "react";
import { Card as Scard, Image, Icon, Button } from "semantic-ui-react";

export function EventCard({
  id,
  image,
  restaurantName,
  restaurantAddress,
  dateTime,
  description,
  btnCards,
}) {
  return (
    <Scard key={id} className="event-card">
      <Image src={image} wrapped ui={false} />
      <Scard.Content>
        <Scard.Header>{restaurantName}</Scard.Header>
        <Scard.Meta>
          <span className="address">{restaurantAddress}</span>
          <span className="date">{dateTime}</span>
        </Scard.Meta>
        <Scard.Description>{description}</Scard.Description>
      </Scard.Content>
      <Scard.Content extra center>
        {btnCards}
      </Scard.Content>
    </Scard>
  );
}
