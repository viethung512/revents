import { LOGIN_USER, SIGN_OUT_USER } from './authConstants';

const authReducerInitialState = {
  authenticated: false,
  currentUser: null,
};

const authReducer = (state = authReducerInitialState, { type, payload }) => {
  switch (type) {
    case LOGIN_USER:
      return {
        authenticated: true,
        currentUser: payload.credentials,
      };
    case SIGN_OUT_USER:
      return {
        authenticated: false,
        currentUser: null,
      };
    default:
      return state;
  }
};

export default authReducer;
