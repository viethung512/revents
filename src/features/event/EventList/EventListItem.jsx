import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import { format, parseISO } from 'date-fns';

// components
import EventListAttendee from './EventListAttendee';

const parseDate = date => {
  if (typeof date === 'string') {
    return format(parseISO(date), 'EEEE do LLL');
  }

  return format(date, 'EEEE do LLL');
};

const parseTime = date => {
  if (typeof date === 'string') {
    return format(parseISO(date), 'h:mm a');
  }

  return format(date, 'h:mm a');
};

function EventListItem(props) {
  const { event, deleteEvent } = props;
  const {
    id,
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
          <Icon name='clock' /> {parseDate(date)} at {parseTime(date)}|
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
        <Button
          onClick={() => deleteEvent(id)}
          as='a'
          color='red'
          floated='right'
          content='Delete'
        />
        <Button
          as={Link}
          to={`/events/${id}`}
          color='teal'
          floated='right'
          content='View'
        />
      </Segment>
    </Segment.Group>
  );
}

export default EventListItem;
