import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Image, Item, Header, Button, Label } from 'semantic-ui-react';
import { format } from 'date-fns';
import LazyLoad from 'react-lazyload';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../modals/modalActions';

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
  authenticated,
}) {
  const dispatch = useDispatch();
  const { id, title, category, date, hostedBy, cancelled } = event;
  const { loading } = useSelector(state => state.async);

  const handleOpenModal = () => dispatch(openModal('UnauthModal'));

  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <LazyLoad
          height={150}
          placeholder={
            <Image src='/assets/default.png' fluid style={eventImageStyle} />
          }
        >
          <Image
            src={`/assets/categoryImages/${category}.jpg`}
            fluid
            style={eventImageStyle}
          />
        </LazyLoad>

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
            {cancelled && <Label color='red'>This event has been cancel</Label>}

            {isGoing && authenticated && (
              <Button onClick={cancelGoingToEvent}>Cancel My Place</Button>
            )}

            {!isGoing && authenticated && (
              <Button color='teal' onClick={goingToEvent} loading={loading}>
                JOIN THIS EVENT
              </Button>
            )}

            {!authenticated && (
              <Button color='teal' onClick={handleOpenModal} loading={loading}>
                JOIN THIS EVENT
              </Button>
            )}

            {/* {cancelled ? (
              <Label color='red'>This event has been cancel</Label>
            ) : isGoing ? (
              <Button onClick={cancelGoingToEvent}>Cancel My Place</Button>
            ) : (
              <Button color='teal' onClick={goingToEvent} loading={loading}>
                JOIN THIS EVENT
              </Button>
            )} */}
          </Fragment>
        )}
      </Segment>
    </Segment.Group>
  );
}

export default EventDetailedHeader;
