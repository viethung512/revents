import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Item, Icon, List, Button, Label } from 'semantic-ui-react';
import { format } from 'date-fns';

// components
import EventListAttendee from './EventListAttendee';

const parseDate = date => format(date, 'EEEE do LLL');
const parseTime = date => format(date, 'h:mm a');

function EventListItem(props) {
  const { event } = props;
  const {
    id,
    title,
    date,
    description,
    venue,
    hostUid,
    hostedBy,
    hostPhotoURL,
    attendees,
    cancelled,
  } = event;

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular src={hostPhotoURL} />
            <Item.Content>
              <Item.Header as={Link} to={`/events/${id}`}>
                {title}
              </Item.Header>
              <Item.Description>
                Hosted by <Link to={`/profile/${hostUid}`}>{hostedBy}</Link>
              </Item.Description>
              {cancelled && (
                <Label
                  style={{ top: '-40px' }}
                  ribbon='right'
                  color='red'
                  content='This event has been cancelled'
                />
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          {date && (
            <Fragment>
              <Icon name='clock' /> {parseDate(date.toDate())} at{' '}
              {parseTime(date.toDate())}
            </Fragment>
          )}
          |
          <Icon name='marker' /> {venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {attendees &&
            Object.values(attendees).map((attendee, index) => (
              <EventListAttendee key={index} attendee={attendee} />
            ))}
        </List>
      </Segment>
      <Segment clearing>
        <span>{description}</span>
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
