import React from "react";
import { Card as Scard, Image, Icon, Button } from "semantic-ui-react";
import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
// import { QUERY_EVENTS } from "../utils/queries";

export function EventCard({
  id,
  image,
  restaurantName,
  restaurantAddress,
  dateTime,
  description,
}) {
  const { data } = useQuery(QUERY_ME);
  const user = data?.me || [];
  console.log(user);
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
