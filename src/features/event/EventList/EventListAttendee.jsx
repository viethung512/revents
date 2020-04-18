import React from 'react';
import { List, Image } from 'semantic-ui-react';

function EventListAttendee({ attendee: { photoURL } }) {
  return (
    <List.Item>
      <Image as='a' size='mini' circular src={photoURL} />
    </List.Item>
  );
}

export default EventListAttendee;
