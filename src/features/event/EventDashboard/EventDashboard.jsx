import React, { useState } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import cuid from 'cuid';

// components
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';

const eventsFromDashboard = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
      },
    ],
  },
  {
    id: '2',
    title: 'Trip to Punch and Judy Pub',
    date: '2018-03-28',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
      },
    ],
  },
];

function EventDashboard(props) {
  const [events, setEvents] = useState(eventsFromDashboard);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // const handleIsOpenToggle = () => setIsOpen(!isOpen);

  const handleCreateFormOpen = () => {
    setIsOpen(true);
    setSelectedEvent(null);
  };

  const handleFormCancel = () => {
    setIsOpen(false);
  };

  const handleCreateEvent = newEvent => {
    const newEventData = {
      ...newEvent,
      id: cuid(),
      hostPhotoURL: '/assets/user.png',
    };

    setEvents([...events, newEventData]);
    setIsOpen(false);
  };

  const handleUpdateEvent = updatedEvent => {
    const newEvents = events.map(event =>
      event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event
    );
    setEvents(newEvents);
    setIsOpen(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = id => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleSelectEvent = event => {
    setSelectedEvent(event);
    setIsOpen(true);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          events={events}
          selectedEvent={handleSelectEvent}
          deleteEvent={handleDeleteEvent}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        <Button
          onClick={handleCreateFormOpen}
          positive
          content='Create Event '
        />
        {isOpen && (
          <EventForm
            cancelFormOpen={handleFormCancel}
            createEvent={handleCreateEvent}
            updateEvent={handleUpdateEvent}
            selectedEvent={selectedEvent}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}

export default EventDashboard;
