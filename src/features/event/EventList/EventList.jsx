import React, { Fragment } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

// components
import EventListItem from './EventListItem';
import { objectToArray } from '../../../app/common/util/helper';

function EventList({ events, getNextEvents, loading, moreEvents }) {
  return (
    <Fragment>
      <InfiniteScroll
        pageStart={0}
        loadMore={getNextEvents}
        hasMore={!loading && moreEvents}
        initialLoad={false}
      >
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
      </InfiniteScroll>
    </Fragment>
  );
}

export default EventList;
