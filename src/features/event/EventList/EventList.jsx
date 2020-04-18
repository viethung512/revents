import React, { Fragment } from 'react';

// components
import EventListItem from './EventListItem';

function EventList({ events }) {
  return (
    <Fragment>
      {events.map((event, index) => (
        <EventListItem key={index} event={event} />
      ))}
    </Fragment>
  );
}

export default EventList;
