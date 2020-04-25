import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Header } from 'semantic-ui-react';
import { incrementAsync, decrementAsync } from './testActions';
import { openModal } from '../modals/modalActions';
import TestPlaceInput from './TestPlaceInput';
import SimpleMap from './SimpleMap';
import firebase from '../../app/config/firebase.js';
import { toastr } from 'react-redux-toastr';

function TestComponent(props) {
  const dispatch = useDispatch();
  const test = useSelector(state => state.test);
  const async = useSelector(state => state.async);

  const { loading, elementName } = async;

  const handleIncrementCounter = e => dispatch(incrementAsync(e.target.name));
  const handleDecrementCounter = e => dispatch(decrementAsync(e.target.name));

  const handleTestUpdateProfile = async () => {
    const firestore = firebase.firestore();
    // doc = diana's userUid
    let userDocRef = await firestore
      .collection('users')
      .doc('oTemLo4a4PU7H2eh0XzFwWEBZbI2');
    try {
      await userDocRef.update({ displayName: 'testing' });
      toastr.success('Success');
    } catch (error) {
      console.log(error);
      toastr.error('Computer says no');
    }
  };

  const handleCreateTestEvent = async () => {
    const firestore = firebase.firestore();
    let eventDocRef = await firestore.collection('events').doc('DELETEME');
    try {
      await eventDocRef.set({
        title: 'DELETEME',
      });
      toastr.success('Success');
    } catch (error) {
      console.log(error);
      toastr.error('Computer says no');
    }
  };

  const handleTestJoinEvent = async () => {
    const firestore = firebase.firestore();
    let eventDocRef = await firestore.collection('events').doc('DELETEME');
    const attendee = {
      photoURL: '/assets/user.png',
      displayName: 'Testing',
    };
    try {
      await eventDocRef.update({
        [`attendees.oTemLo4a4PU7H2eh0XzFwWEBZbI2`]: attendee,
      });
      toastr.success('Success');
    } catch (error) {
      console.log(error);
      toastr.error('Computer says no');
    }
  };

  const handleTestCancelGoingToEvent = async () => {
    const firestore = firebase.firestore();
    let eventDocRef = await firestore.collection('events').doc('DELETEME');
    try {
      await eventDocRef.update({
        [`attendees.oTemLo4a4PU7H2eh0XzFwWEBZbI2`]: firebase.firestore.FieldValue.delete(),
      });
      toastr.success('Success');
    } catch (error) {
      console.log(error);
      toastr.error('Computer says no');
    }
  };

  const handleTestChangeAttendeePhotoInEvent = async () => {
    const firestore = firebase.firestore();
    let eventDocRef = await firestore.collection('events').doc('DELETEME');
    try {
      await eventDocRef.update({
        [`attendees.oTemLo4a4PU7H2eh0XzFwWEBZbI2.photoURL`]: 'testing123.jpg',
      });
      toastr.success('Success');
    } catch (error) {
      console.log(error);
      toastr.error('Computer says no');
    }
  };

  return (
    <div>
      <h1>Test Component</h1>
      <h3>The answer is: {test.data}</h3>
      <Button
        name='increment'
        onClick={handleIncrementCounter}
        positive
        content='Increment'
        loading={loading && elementName === 'increment'}
      />
      <Button
        name='decrement'
        onClick={handleDecrementCounter}
        negative
        content='Decrement'
        loading={loading && elementName === 'decrement'}
      />
      <Button
        onClick={() => dispatch(openModal('TestModal', { data: 42 }))}
        color='teal'
        content='Open Modal'
      />
      <br />
      <hr />
      <br />
      <br />
      <Header as='h2' content='Permissions tests' />
      <Button
        onClick={handleCreateTestEvent}
        color='blue'
        fluid
        content='Test create event - should fail if anon'
      />
      <Button
        onClick={handleTestUpdateProfile}
        color='orange'
        fluid
        content='Test update dianas profile - should fail if anon/not kara - should succeed if kara'
      />
      <Button
        onClick={handleTestJoinEvent}
        color='olive'
        fluid
        content='Test joining an event - should fail if anon/not kara - should succeed if kara'
      />
      <Button
        onClick={handleTestCancelGoingToEvent}
        color='purple'
        fluid
        content='Test cancelling attendance to an event - should fail if anon/not kara - should succeed if kara'
      />
      <Button
        onClick={handleTestChangeAttendeePhotoInEvent}
        color='violet'
        fluid
        content='Test changing photo for event attendee - should fail if anon/not kara - should succeed if kara'
      />
      <br />
      <br />
      <TestPlaceInput />
      <SimpleMap />
    </div>
  );
}

export default TestComponent;
