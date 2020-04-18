import React from 'react';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';

// components
import EventListAttendee from './EventListAttendee';

function EventListItem({ event }) {
  const {
    title,
    date,
    description,
    venue,
    hostedBy,
    hostPhotoURL,
    attendees,
  } = event;
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular src={hostPhotoURL} />
            <Item.Content>
              <Item.Header as='a'>{title}</Item.Header>
              <Item.Description>
                Hosted by <a href='#reorie'>{hostedBy}</a>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' /> {date} |
          <Icon name='marker' /> {venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {attendees &&
            attendees.map((attendee, index) => (
              <EventListAttendee key={index} attendee={attendee} />
            ))}
        </List>
      </Segment>
      <Segment clearing>
        <span>{description}</span>
        <Button as='a' color='teal' floated='right' content='View' />
      </Segment>
    </Segment.Group>
  );
}

export default EventListItem;
