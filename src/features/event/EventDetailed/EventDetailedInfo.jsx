import React, { useState, useEffect, Fragment } from 'react';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';
import EventDetailedMap from './EventDetailedMap';
import { format, parseISO } from 'date-fns';

const parseDate = date => {
  if (typeof date === 'string') {
    return format(parseISO(date), 'EEEE do LLL');
  }

  return format(date, 'EEEE do LLL');
};

const parseTime = date => {
  if (typeof date === 'string') {
    return format(parseISO(date), 'h:mm a');
  }

  return format(date, 'h:mm a');
};

function EventDetailedInfo({ event }) {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [venueLatLng, setVenueLatLng] = useState({
    lat: 1,
    lng: 1,
  });
  const { id, date, description, venue } = event;

  useEffect(() => {
    if (id) {
      setVenueLatLng(event.venueLatLng);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Segment.Group>
      <Segment attached='top'>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='info' />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='calendar' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>
            {date && (
              <Fragment>
                <span>{parseDate(date)}</span> at
                <span>{parseTime(date)}</span>
              </Fragment>
            )}
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='marker' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{venue}</span>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
              color='teal'
              size='tiny'
              content={isMapOpen ? 'Hide Map' : 'Show Map'}
              onClick={() => setIsMapOpen(!isMapOpen)}
            />
          </Grid.Column>
        </Grid>
      </Segment>
      {isMapOpen && (
        <EventDetailedMap lat={venueLatLng.lat} lng={venueLatLng.lng} />
      )}
    </Segment.Group>
  );
}

export default EventDetailedInfo;
