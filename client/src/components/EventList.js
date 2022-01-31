import React from "react";
import { Card, Icon, Image, Button } from "semantic-ui-react";
// import { useQuery } from "@apollo/client";
// import { QUERY_EVENTS } from "../utils/queries";

export default function EventList() {
  // const {loading, data} = useQuery(QUERY_EVENTS);
  // const events= data.events || []

  return (
    <div>
      <Card.Group centered>
        <Card key="id" id="event-card">
          <Image
            src="https://media-cdn.tripadvisor.com/media/photo-s/1c/b8/c1/6e/bigger-bolder-more-dynamic.jpg"
            wrapped
            ui={false}
          />
          <Card.Content>
            <Card.Header>Hochi Mama</Card.Header>
            <Card.Meta>
              <span className="date">Date: 12/02/2022, Time: 7pm</span>
            </Card.Meta>
            <Card.Description>
              Would love to meet new people over some beautiful modern asian
              food.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
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
          </Card.Content>
        </Card>
        <Card key="id" id="event-card">
          <Image
            src="http://www.fogliadifico.com.au/wp-content/uploads/2020/05/Bottega.jpg"
            wrapped
            ui={false}
          />
          <Card.Content>
            <Card.Header>Foglia di Fico</Card.Header>
            <Card.Meta>
              <span className="date">Date: 10/02/2022, Time: 6pm</span>
            </Card.Meta>
            <Card.Description>
              Wanting to find a large group of people who are willing to pasta
              together.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
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
          </Card.Content>
        </Card>
        <Card key="id" id="event-card">
          <Image
            src="https://chocolatebuddha.com.au/wp-content/uploads/2020/02/Architecture-2-1024x682.jpg"
            wrapped
            ui={false}
          />
          <Card.Content>
            <Card.Header>Chocolate Buddha</Card.Header>
            <Card.Meta>
              <span className="date">Date: 21/03/2022, Time: 8pm</span>
            </Card.Meta>
            <Card.Description>
              Nothing chocolatey about this one! It's all about japanese fusion
              that takes things to the next level. Come join me!
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
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
          </Card.Content>
        </Card>
      </Card.Group>
    </div>
  );
}
