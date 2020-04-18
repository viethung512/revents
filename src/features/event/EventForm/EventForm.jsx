import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Segment, Form, Button } from 'semantic-ui-react';
import cuid from 'cuid';

// actions
import { createEvent, updateEvent } from '../eventActions';

const defaultState = {
  title: '',
  date: '',
  city: '',
  venue: '',
  hostedBy: '',
};

function EventForm(props) {
  const dispatch = useDispatch();
  const events = useSelector(state => state.events);
  const [state, setState] = useState(defaultState);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id && events.length > 0) {
      const event = events.find(e => e.id === id);
      if (event) {
        setState({ ...state, ...event });
      }
    } else {
      setState(defaultState);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleFormSubmit = e => {
    e.preventDefault();
    if (state.id) {
      dispatch(updateEvent(state));
      history.goBack();
    } else {
      const newEvent = {
        ...state,
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
      };
      dispatch(createEvent(newEvent));
      history.push(`/events`);
    }
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <Segment>
      <Form onSubmit={handleFormSubmit} autoComplete='off'>
        <Form.Field>
          <label>Event Title</label>
          <input
            placeholder='Event Title'
            name='title'
            value={state.title}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Event Date</label>
          <input
            type='date'
            placeholder='Event Date'
            name='date'
            value={state.date}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>City</label>
          <input
            placeholder='City event is taking place'
            name='city'
            value={state.city}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Venue</label>
          <input
            placeholder='Enter the Venue of the event'
            name='venue'
            value={state.venue}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Hosted By</label>
          <input
            placeholder='Enter the name of person hosting'
            name='hostedBy'
            value={state.hostedBy}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Button positive type='submit'>
          Submit
        </Button>
        <Button onClick={() => history.goBack()} type='button'>
          Cancel
        </Button>
      </Form>
    </Segment>
  );
}

export default EventForm;
