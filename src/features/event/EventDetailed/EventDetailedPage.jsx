import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

// components
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';

function EventDetailedPage({ match }) {
  const events = useSelector(state => state.events);
  const [event, setEvent] = useState({});
  const { id } = match.params;

  useEffect(() => {
    if (id && events.length > 0) {
      const currentEvent = events.find(event => event.id === id);
      if (currentEvent) {
        setEvent(currentEvent);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={event.attendees} />
      </Grid.Column>
    </Grid>
  );
}

export default EventDetailedPage;
