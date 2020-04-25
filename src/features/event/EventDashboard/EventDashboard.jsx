import React, { Fragment, useEffect, useState, useRef } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
// components
import EventList from '../EventList/EventList';
// actions
import LoadingComponents from '../../../app/layout/LoadingComponents';
import EventActivity from '../EventActivity/EventActivity';
import { getEventsForDashboard, clearEvents } from '../eventActions';
import { useFirestoreConnect } from 'react-redux-firebase';
import { objectToArray } from '../../../app/common/util/helper';

function EventDashboard(props) {
  const dispatch = useDispatch();
  const events = useSelector(state => state.events);
  const { loading } = useSelector(state => state.async);
  const [moreEvents, setMoreEvents] = useState(true);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadedEvents, setLoadedEvents] = useState([]);

  const activities = useSelector(({ firestore: { data } }) =>
    data.activities ? objectToArray(data.activities) : []
  );

  const contextRef = useRef();

  useFirestoreConnect({
    collection: 'activity',
    orderBy: ['timestamp', 'desc'],
    limit: 5,
    storeAs: 'activities',
  });
  useEffect(() => {
    const initEvents = async () => {
      const next = await dispatch(getEventsForDashboard());

      if (next && next.docs && next.docs.length >= 1) {
        setMoreEvents(true);
      }
      setLoadingInitial(false);
    };

    initEvents();

    return () => {
      setLoadedEvents([]);
      dispatch(clearEvents());
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loadedEvents.length === 0 && events.length !== 0) {
      setLoadedEvents(events);
    } else {
      setLoadedEvents([...loadedEvents, ...events]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events]);

  const getNextEvents = async () => {
    let lastEvent = events[events.length - 1];

    let next = await dispatch(getEventsForDashboard(lastEvent));

    if (!(next && next.docs && next.docs.length > 1)) {
      setMoreEvents(false);
    }
  };

  return (
    <Fragment>
      {loadingInitial ? (
        <LoadingComponents />
      ) : (
        <Grid>
          <Grid.Column width={10}>
            {events && events.length > 0 ? (
              <div ref={contextRef}>
                <EventList
                  events={loadedEvents}
                  loading={loading}
                  moreEvents={moreEvents}
                  getNextEvents={getNextEvents}
                />
              </div>
            ) : (
              <p>No event here</p>
            )}
          </Grid.Column>
          <Grid.Column width={6}>
            <EventActivity activities={activities} contextRef={contextRef} />
          </Grid.Column>
          <Grid.Column width={10}>
            <Loader active={loading} />
          </Grid.Column>
        </Grid>
      )}
    </Fragment>
  );
}

export default EventDashboard;
