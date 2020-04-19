import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';

const Marker = () => <Icon name='marker' size='big' color='red' />;

function EventDetailedMap({ lat, lng }) {
  const zoom = 14;
  return (
    <Segment attached='bottom' style={{ padding: 0 }}>
      <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDd1M1WTFm6nuv3YUFvjx9B8qszWThVeMQ' }}
          defaultCenter={{ lat, lng }}
          defaultZoom={zoom}
        >
          <Marker lat={lat} lng={lng} text='My Marker' />
        </GoogleMapReact>
      </div>
    </Segment>
  );
}

export default EventDetailedMap;
