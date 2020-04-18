import React, { useState } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

function EventForm({ cancelFormOpen, createEvent }) {
  const [state, setState] = useState({
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: '',
  });

  const handleFormSubmit = e => {
    e.preventDefault();
    createEvent(state);
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
        <Button onClick={cancelFormOpen} type='button'>
          Cancel
        </Button>
      </Form>
    </Segment>
  );
}

export default EventForm;
