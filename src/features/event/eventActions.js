import { toastr } from 'react-redux-toastr';
import { createNewEvent } from '../../app/common/util/helper';

export const createEvent = event => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;

  const photoURL = getState().firebase.profile.avatarUrl;
  const newEvent = createNewEvent(user, photoURL, event);

  try {
    const createdEvent = await firestore.add('events', newEvent);
    await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
      eventId: createdEvent.id,
      userUid: user.uid,
      eventDate: event.date,
      host: true,
    });
    toastr.success('Success!', 'Event has been created');
    return createdEvent;
  } catch (err) {
    console.log(err);
    toastr.error('Oops', 'Something went wrong');
  }
};

export const updateEvent = event => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();

  try {
    await firestore.update(`events/${event.id}`, event);
    toastr.success('Success!', 'Event has been updated');
  } catch (err) {
    toastr.error('Oops', 'Some thing went wrong');
  }
};

export const cancelToggle = (cancelled, eventId) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  const message = cancelled
    ? 'This will reactivate the event, are you sure?'
    : 'Are you sure you want to cancel this event?';

  try {
    toastr.confirm(message, {
      onOk: async () => {
        await firestore.update(`events/${eventId}`, { cancelled: !cancelled });
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const goingToEvent = event => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const profile = getState().firebase.profile;
  const attendee = {
    going: true,
    joinDate: firestore.FieldValue.serverTimestamp(),
    photoURL: profile.avatarUrl || '/assets/user.png',
    displayName: profile.displayName,
    host: false,
  };

  try {
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: attendee,
    });

    await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
      eventId: event.id,
      userUid: user.uid,
      eventDate: event.date,
      host: false,
    });
    toastr.success('Success', 'You have signed up to the event');
  } catch (err) {
    console.log(err);
    toastr.error('Oops', 'Problem signing up to the event');
  }
};

export const cancelGoingToEvent = event => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;

  try {
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: firestore.FieldValue.delete(),
    });

    await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
    toastr.success('Success', 'You have removed yourself from  the event');
  } catch (err) {
    console.log(err);
    toastr.error('Oops', 'Problem signing up to the event');
  }
};
