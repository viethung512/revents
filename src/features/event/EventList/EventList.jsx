import React, { Fragment } from 'react';

// components
import EventListItem from './EventListItem';

function EventList(props) {
  const { events, deleteEvent } = props;
  return (
    <Fragment>
      {events &&
        events.map((event, index) => (
          <EventListItem key={index} event={event} deleteEvent={deleteEvent} />
        ))}
    </Fragment>
  );
}

export default EventList;
