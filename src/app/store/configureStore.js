import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';

// connect firestore config
import firebase from '../config/firebase';
import { getFirebase, createFirebaseInstance } from 'react-redux-firebase';
import {
  getFirestore,
  createFirestoreInstance,
  reduxFirestore,
} from 'redux-firestore';

const rrfConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
  updateProfileOnLogin: false,
};

const configureStore = () => {
  const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];
  const composeEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares),
    reduxFirestore(firebase)
  );
  const store = createStore(rootReducer, composeEnhancer);

  return store;
};

export const store = configureStore();

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
  createFirebaseInstance,
};
