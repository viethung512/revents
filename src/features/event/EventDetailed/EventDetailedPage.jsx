import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  useFirestoreConnect,
  useFirebaseConnect,
  isEmpty,
} from 'react-redux-firebase';

// components
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import { objectToArray, createDataTree } from '../../../app/common/util/helper';
import { goingToEvent, cancelGoingToEvent } from '../eventActions';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import NotFound from '../../../app/layout/NotFound';

function EventDetailedPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { uid: authId, isLoaded, isEmpty: authIsEmpty } = useSelector(
    state => state.firebase.auth
  );
  const requesting = useSelector(state => state.firestore.status.requesting);
  const event = useSelector(({ firestore: { data } }) =>
    data.event ? { ...data.event, id } : {}
  );
  const eventChat = useSelector(({ firebase: { ordered } }) =>
    ordered.event_chat ? objectToArray(ordered.event_chat[id]) : []
  );
  const attendees = useSelector(({ firestore: { data } }) =>
    event.id && event.attendees
      ? objectToArray(event.attendees).sort((a, b) => b.joinDate - a.joinDate)
      : []
  );
  const isGoing = useSelector(({ firestore: { data } }) =>
    attendees && attendees.find(att => att.id === authId) ? true : false
  );

  const isHost = event && event.hostUid === authId;

  useFirebaseConnect(`event_chat/${id}`);

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
  const chatTree = !isEmpty(eventChat) && createDataTree(eventChat);
  const authenticated = isLoaded && !authIsEmpty;

  const renderResult = loading ? (
    <LoadingComponents />
  ) : Object.keys(event).length === 0 ? (
    <NotFound />
  ) : (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader
          event={event}
          isHost={isHost}
          isGoing={isGoing}
          goingToEvent={handleGoingToEvent}
          cancelGoingToEvent={handleCancelGoingToEvent}
          authenticated={authenticated}
        />
        <EventDetailedInfo event={event} />
        {authenticated && (
          <EventDetailedChat eventId={id} eventChat={chatTree} />
        )}
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={attendees} />
      </Grid.Column>
    </Grid>
  );

  return renderResult;
}

export default EventDetailedPage;
