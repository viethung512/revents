import React, { useEffect, Fragment } from 'react';
import { Grid } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
// components
import EventList from '../EventList/EventList';
// actions
import { deleteEvent, loadEvents } from '../eventActions';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import EventActivity from '../EventActivity/EventActivity';

function EventDashboard(props) {
  const dispatch = useDispatch();
  const events = useSelector(state => state.events);
  const async = useSelector(state => state.async);

  const { loading } = async;

  useEffect(() => {
    dispatch(loadEvents());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleDeleteEvent = id => dispatch(deleteEvent(id));

  return (
    <Fragment>
      {loading ? (
        <LoadingComponents />
      ) : (
        <Grid>
          <Grid.Column width={10}>
            <EventList events={events} deleteEvent={handleDeleteEvent} />
          </Grid.Column>
          <Grid.Column width={6}>
            <EventActivity />
          </Grid.Column>
        </Grid>
      )}
    </Fragment>
  );
}

export default EventDashboard;
