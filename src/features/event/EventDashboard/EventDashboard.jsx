import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
// components
import EventList from '../EventList/EventList';
// actions
import { deleteEvent } from '../eventActions';

function EventDashboard(props) {
  const dispatch = useDispatch();
  const events = useSelector(state => state.events);

  const handleDeleteEvent = id => dispatch(deleteEvent(id));

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} deleteEvent={handleDeleteEvent} />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Activity feed</h2>
      </Grid.Column>
    </Grid>
  );
}

export default EventDashboard;
