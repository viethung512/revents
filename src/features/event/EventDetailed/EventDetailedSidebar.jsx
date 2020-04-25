import React, { Fragment } from 'react';
import { Segment, Item, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

function EventDetailedSidebar({ attendees }) {
  return (
    <Fragment>
      <Segment
        textAlign='center'
        style={{ border: 'none' }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        {attendees && attendees.length}{' '}
        {attendees && attendees.length === 1 ? 'Person' : 'People'} Going
      </Segment>
      <Segment attached>
        <Item.Group divided>
          {attendees &&
            attendees.map((attendee, index) => (
              <Item style={{ position: 'relative' }} key={index}>
                {attendee.host && (
                  <Label
                    style={{ position: 'absolute' }}
                    color='orange'
                    ribbon='right'
                  >
                    Host
                  </Label>
                )}

                <LazyLoad
                  height={150}
                  placeholder={
                    <Item.Image size='tiny' src='/assets/user.png' />
                  }
                >
                  <Item.Image size='tiny' src={attendee.photoURL} />
                </LazyLoad>

                <Item.Content verticalAlign='middle'>
                  <Item.Header as='h3'>
                    <Link to={`/profile/${attendee.id}`}>
                      {attendee.displayName}
                    </Link>
                  </Item.Header>
                </Item.Content>
              </Item>
            ))}
        </Item.Group>
      </Segment>
    </Fragment>
  );
}

export default EventDetailedSidebar;
