import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
  CLEAR_EVENTS,
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
    case FETCH_EVENTS:
      return payload.events;
    case CLEAR_EVENTS:
      return [];
    default:
      return state;
  }
};

export default eventReducer;
