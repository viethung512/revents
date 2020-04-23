import React, { Fragment } from 'react';
import { Grid } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useFirestoreConnect } from 'react-redux-firebase';

// components
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import { objectToArray } from '../../../app/common/util/helper';
import { goingToEvent, cancelGoingToEvent } from '../eventActions';
import LoadingComponents from '../../../app/layout/LoadingComponents';

function EventDetailedPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const authId = useSelector(state => state.firebase.auth.uid);
  const requesting = useSelector(state => state.firestore.status.requesting);
  const event = useSelector(({ firestore: { data } }) =>
    data.event ? { ...data.event, id } : {}
  );
  const attendees = useSelector(({ firestore: { data } }) =>
    event.id && event.attendees ? objectToArray(event.attendees) : []
  );
  const isGoing = useSelector(({ firestore: { data } }) =>
    attendees && attendees.find(att => att.id === authId) ? true : false
  );

  const isHost = event && event.hostUid === authId;

  useFirestoreConnect({
    collection: 'events',
    doc: id,
    storeAs: 'event',
  });

  const handleGoingToEvent = () => {
    if (event) {
      dispatch(goingToEvent(event));
    }
  };

  const handleCancelGoingToEvent = () => {
    if (event) {
      dispatch(cancelGoingToEvent(event));
    }
  };

  const loading = Object.values(requesting).some(a => a === true);

  return (
    <Grid>
      {loading ? (
        <LoadingComponents />
      ) : (
        <Fragment>
          <Grid.Column width={10}>
            <EventDetailedHeader
              event={event}
              isHost={isHost}
              isGoing={isGoing}
              goingToEvent={handleGoingToEvent}
              cancelGoingToEvent={handleCancelGoingToEvent}
            />
            <EventDetailedInfo event={event} />
            <EventDetailedChat />
          </Grid.Column>
          <Grid.Column width={6}>
            <EventDetailedSidebar attendees={attendees} />
          </Grid.Column>
        </Fragment>
      )}
    </Grid>
  );
}

export default EventDetailedPage;
