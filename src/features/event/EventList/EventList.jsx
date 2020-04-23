import React, { Fragment } from 'react';

// components
import EventListItem from './EventListItem';
import { objectToArray } from '../../../app/common/util/helper';

function EventList({ events }) {
  return (
    <Fragment>
      {events &&
        events.map((event, index) => (
          <EventListItem
            key={index}
            event={{
              ...event,
              attendees: objectToArray(event.attendees),
            }}
          />
        ))}
    </Fragment>
  );
}

export default EventList;
