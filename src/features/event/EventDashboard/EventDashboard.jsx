import React, { Fragment } from 'react';
import { Grid } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
// components
import EventList from '../EventList/EventList';
// actions
import LoadingComponents from '../../../app/layout/LoadingComponents';
import EventActivity from '../EventActivity/EventActivity';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';

function EventDashboard(props) {
  const { events } = useSelector(state => state.firestore.ordered);

  useFirestoreConnect([{ collection: 'events' }]);

  return (
    <Fragment>
      {!isLoaded(events) ? (
        <LoadingComponents />
      ) : (
        <Grid>
          <Grid.Column width={10}>
            {events && events.length > 0 ? (
              <EventList events={events} />
            ) : (
              <p>No event here</p>
            )}
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
