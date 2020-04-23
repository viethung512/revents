import React, { Fragment } from 'react';
import { Card, Image, Segment, Header, Grid, Tab } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

const panes = [
  { menuItem: 'All Events', pane: { key: 'allEvents' } },
  { menuItem: 'Past Events', pane: { key: 'pastEvents' } },
  { menuItem: 'Future Events', pane: { key: 'futureEvents' } },
  { menuItem: 'Events Hosted', pane: { key: 'eventsHosted' } },
];

const ItemEvent = ({ event: { id, title, category, date } }) => (
  <Card as={Link} to={`/events/${id}`}>
    <Image src={`/assets/categoryImages/${category}.jpg`} />
    <Card.Content>
      <Card.Header textAlign='center'>{title}</Card.Header>
      <Card.Meta textAlign='center'>
        {date && (
          <Fragment>
            <div>{format(date.toDate(), 'dd LLL yyyy')}</div>
            <div>{format(date.toDate(), 'h:mm a')}</div>
          </Fragment>
        )}
      </Card.Meta>
    </Card.Content>
  </Card>
);

function UserDetailedEvents({ events, eventsLoading, changeTab }) {
  return (
    <Grid.Column width={12}>
      <Segment attached loading={eventsLoading}>
        <Header icon='calendar' content='Events' />
        <Tab
          panes={panes}
          menu={{ secondary: true, pointing: true }}
          onTabChange={(e, data) => changeTab(e, data)}
        />
        <br />
        <Card.Group itemsPerRow={5}>
          {events &&
            events.map(event => <ItemEvent key={event.id} event={event} />)}
        </Card.Group>
      </Segment>
    </Grid.Column>
  );
}

export default UserDetailedEvents;
