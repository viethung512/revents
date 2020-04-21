import React, { Fragment } from 'react';
import { Grid } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
// components
import EventList from '../EventList/EventList';
// actions
import { deleteEvent } from '../eventActions';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import EventActivity from '../EventActivity/EventActivity';
import { useFirestoreConnect } from 'react-redux-firebase';

function EventDashboard(props) {
  const dispatch = useDispatch();
  const { events } = useSelector(state => state.firestore.ordered);
  const async = useSelector(state => state.async);

  useFirestoreConnect([{ collection: 'events' }]);

  const { loading } = async;
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
