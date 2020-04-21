import { SubmissionError, reset } from 'redux-form';
import { closeModal } from '../modals/modalActions';
import { toastr } from 'react-redux-toastr';

export const login = ({ email, password }) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();

  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    dispatch(closeModal());
  } catch (err) {
    console.log(err);
    throw new SubmissionError({
      _error: 'Login fail',
    });
  }
};

export const registerUser = ({ displayName, email, password }) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();

  try {
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await createdUser.user.updateProfile({ displayName });
    let newUser = {
      displayName,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };
    await firestore.set(`users/${createdUser.user.uid}`, { ...newUser });
    dispatch(closeModal());
  } catch (err) {
    console.log(err);
    throw new SubmissionError({
      _error: err.message,
    });
  }
};

export const socialLogin = selectedProvider => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();

  try {
    dispatch(closeModal());
    await firebase.login({
      provider: selectedProvider,
      type: 'popup',
    });
  } catch (err) {
    console.log(err);
  }
};

export const updatePassword = credentials => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();

  const user = firebase.auth().currentUser;
  try {
    await user.updatePassword(credentials.newPassword1);
    await dispatch(reset('account'));

    toastr.success('Success', 'Your Password has been updated');
  } catch (err) {
    throw new SubmissionError({
      _error: err.message,
    });
  }
};
