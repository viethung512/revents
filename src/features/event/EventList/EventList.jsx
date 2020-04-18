import React, { Fragment } from 'react';

// components
import EventListItem from './EventListItem';

function EventList(props) {
  const { events, selectedEvent, deleteEvent } = props;
  return (
    <Fragment>
      {events.map((event, index) => (
        <EventListItem
          key={index}
          event={event}
          selectedEvent={selectedEvent}
          deleteEvent={deleteEvent}
        />
      ))}
    </Fragment>
  );
}

export default EventList;
