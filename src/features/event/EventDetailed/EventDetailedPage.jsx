import React from 'react';
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

function EventDetailedPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const authId = useSelector(state => state.firebase.auth.uid);
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

  return (
    <Grid>
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
    </Grid>
  );
}

export default EventDetailedPage;
