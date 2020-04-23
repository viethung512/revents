import React from 'react';
import { List, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function EventListAttendee({ attendee: { id, photoURL } }) {
  return (
    <List.Item>
      <Image
        as={Link}
        to={`/profile/${id}`}
        size='mini'
        circular
        src={photoURL}
      />
    </List.Item>
  );
}

export default EventListAttendee;
