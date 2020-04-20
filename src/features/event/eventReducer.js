import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENT,
} from './eventConstants';

const initialState = [];

const eventReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_EVENT:
      return [...state, payload.event];
    case UPDATE_EVENT:
      return state.map(event =>
        event.id === payload.event.id ? payload.event : event
      );
    case DELETE_EVENT:
      return state.filter(event => event.id !== payload.eventId);
    case FETCH_EVENT:
      return payload.events;
    default:
      return state;
  }
};

export default eventReducer;
