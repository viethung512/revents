import { FETCH_USER_EVENTS } from './userConstants';

const userReducerInitialState = {
  events: [],
};

const userReducer = (state = userReducerInitialState, { type, payload }) => {
  switch (type) {
    case FETCH_USER_EVENTS:
      return {
        ...state,
        events: payload.events,
      };
    default:
      return state;
  }
};

export default userReducer;
