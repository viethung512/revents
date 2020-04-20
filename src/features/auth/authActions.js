import { LOGIN_USER, SIGN_OUT_USER } from './authConstants';
import { closeModal } from '../modals/modalActions';

export const login = credentials => dispatch => {
  dispatch({
    type: LOGIN_USER,
    payload: { credentials },
  });
  dispatch(closeModal());
};

export const logout = () => ({
  type: SIGN_OUT_USER,
});
