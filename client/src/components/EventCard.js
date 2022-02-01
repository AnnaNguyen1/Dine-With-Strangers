import React from "react";
import { Card as Scard, Image, Icon, Button } from "semantic-ui-react";

export function EventCard({
  key,
  image,
  restaurantName,
  address,
  dateTime,
  description,
}) {
  // function to attend and function to favourite

  // change the attending label if the limit of attendees is maxed and prevent from clicking

  return (
    <Scard key={key} id={key} className="event-card">
      <Image src={image} wrapped ui={false} />
      <Scard.Content>
        <Scard.Header>{restaurantName}</Scard.Header>
        <Scard.Meta>
          <span className="address">{address}</span>
          <span className="date">{dateTime}</span>
        </Scard.Meta>
        <Scard.Description>{description}</Scard.Description>
      </Scard.Content>
      <Scard.Content extra>
        <Button animated size="small">
          <Button.Content visible>Click to attend!</Button.Content>
          <Button.Content hidden>
            Attending!
            <Icon name="check" />
          </Button.Content>
        </Button>
        <Button animated size="small">
          <Button.Content visible>Favourite</Button.Content>
          <Button.Content hidden>
            <Icon color="orange" name="favorite" />
          </Button.Content>
        </Button>
      </Scard.Content>
    </Scard>
  );
}
