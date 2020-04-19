/* global google */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reduxForm, Field, initialize } from 'redux-form';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan,
} from 'revalidate';
import { useHistory, useParams } from 'react-router-dom';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import cuid from 'cuid';

// actions
import { createEvent, updateEvent } from '../eventActions';

// components
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';

const category = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' },
];

const validate = combineValidators({
  title: isRequired({ message: 'The event title is require' }),
  categpry: isRequired({ message: 'The category is require' }),
  description: composeValidators(
    isRequired({ message: 'Please enter the description' }),
    hasLengthGreaterThan(4)({
      message: 'Description needs to be at least 5 characters',
    })
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
  date: isRequired('date'),
});

function EventForm({ handleSubmit, invalid, submitting, pristine, change }) {
  const dispatch = useDispatch();
  const events = useSelector(state => state.events);
  const form = useSelector(state => state.form);

  const { id } = useParams();
  const history = useHistory();
  const [state, setState] = useState({
    cityLatLng: {},
    venueLatLng: {},
  });

  useEffect(() => {
    if (id && events.length > 0 && events.find(e => e.id === id)) {
      const event = events.find(e => e.id === id);
      dispatch(initialize('eventForm', { ...event }));
    } else {
      dispatch(initialize('eventForm', {}));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onFormSubmit = values => {
    values.venueLatLng = state.venueLatLng;
    if (values.id) {
      const updatedEvent = { ...values };
      dispatch(updateEvent(updatedEvent));
      history.push(`/events/${updatedEvent.id}`);
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
        hostedBy: 'Bob',
      };
      dispatch(createEvent(newEvent));
      history.push(`/events/${newEvent.id}`);
    }
  };

  const onCancel = () => {
    if (form.eventForm.initial.id) {
      history.push(`/events/${form.eventForm.initial.id}`);
    } else {
      history.push('/events');
    }
  };

  const handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        console.log('go in');
        setState({
          ...state,
          cityLatLng: latlng,
        });
      })
      .then(() => {
        change('city', selectedCity);
      })
      .catch(err => console.log(err));
  };

  const handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        setState({
          ...state,
          venueLatLng: latlng,
        });
      })
      .then(() => {
        change('venue', selectedVenue);
      });
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment>
          <Form onSubmit={handleSubmit(onFormSubmit)} autoComplete='off'>
            <Header sub color='teal' content='event details' />

            <Field
              name='title'
              type='text'
              component={TextInput}
              placeholder='Give your event a name'
            />
            <Field
              name='category'
              type='text'
              component={SelectInput}
              placeholder='What is your event about?'
              options={category}
            />
            <Field
              name='description'
              type='text'
              component={TextArea}
              rows={3}
              placeholder='Tell us about your event'
            />
            <Header sub color='teal' content='event location details' />
            <Field
              name='city'
              type='text'
              component={PlaceInput}
              placeholder='Event City'
              options={{ types: ['(cities)'] }}
              onSelect={handleCitySelect}
            />
            <Field
              name='venue'
              type='text'
              component={PlaceInput}
              placeholder='Event Venue'
              options={{
                location: new google.maps.LatLng(state.cityLatLng),
                radius: 1000,
                types: ['establishment'],
              }}
              onSelect={handleVenueSelect}
            />
            <Field
              name='date'
              component={DateInput}
              placeholder='Event date'
              dateFormat='dd LLL yyyy h:mm: a'
              showTimeSelect
              timeFormat='HH:mm'
            />

            <Button
              positive
              type='submit'
              disabled={invalid || submitting || pristine}
            >
              Submit
            </Button>
            <Button onClick={onCancel} type='button'>
              Cancel
            </Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default reduxForm({
  form: 'eventForm',
  validate,
})(EventForm);
