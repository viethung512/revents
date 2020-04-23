import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { format } from 'date-fns';

const eventImageStyle = {
  filter: 'brightness(30%)',
};

const eventImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white',
};

const parseDate = date => format(date.toDate(), 'EEEE do LLLL');

function EventDetailedHeader({
  event,
  isGoing,
  isHost,
  goingToEvent,
  cancelGoingToEvent,
}) {
  const { id, title, category, date, hostedBy } = event;

  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${category}.jpg`}
          fluid
          style={eventImageStyle}
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={title}
                  style={{ color: 'white' }}
                />
                {date && <p>{parseDate(date)}</p>}
                <p>
                  Hosted by{' '}
                  <strong>
                    <Link
                      to={`/profile/${event.hostUid}`}
                      style={{ color: 'white' }}
                    >
                      {hostedBy}
                    </Link>
                  </strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached='bottom' clearing>
        {isHost ? (
          <Button color='orange' floated='right' as={Link} to={`/manage/${id}`}>
            Manage Event
          </Button>
        ) : (
          <Fragment>
            {isGoing ? (
              <Button onClick={cancelGoingToEvent}>Cancel My Place</Button>
            ) : (
              <Button color='teal' onClick={goingToEvent}>
                JOIN THIS EVENT
              </Button>
            )}
          </Fragment>
        )}
      </Segment>
    </Segment.Group>
  );
}

export default EventDetailedHeader;
