import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENT,
} from './eventConstants';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from '../async/asyncActions';
import { fetchSampleData } from '../../app/data/mockApi';
import { toastr } from 'react-redux-toastr';

export const createEvent = event => {
  return async dispatch => {
    try {
      dispatch({ type: CREATE_EVENT, payload: { event } });
      toastr.success('Success!', 'Event has been created');
    } catch (err) {
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

export const updateEvent = event => {
  return async dispatch => {
    try {
      dispatch({ type: UPDATE_EVENT, payload: { event } });
      toastr.success('Success!', 'Event has been updated');
    } catch (err) {
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

export const deleteEvent = eventId => ({
  type: DELETE_EVENT,
  payload: { eventId },
});

export const loadEvents = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const events = await fetchSampleData();
      dispatch({ type: FETCH_EVENT, payload: { events } });
      dispatch(asyncActionFinish());
    } catch (err) {
      console.log(err);
      dispatch(asyncActionError());
    }
  };
};
