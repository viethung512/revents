import { LOGIN_USER, SIGN_OUT_USER } from './authConstants';

export const login = credentials => ({
  type: LOGIN_USER,
  payload: { credentials },
});

export const logout = () => ({
  type: SIGN_OUT_USER,
});
