import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDd1M1WTFm6nuv3YUFvjx9B8qszWThVeMQ',
  authDomain: 'revents-274714.firebaseapp.com',
  databaseURL: 'https://revents-274714.firebaseio.com',
  projectId: 'revents-274714',
  storageBucket: 'revents-274714.appspot.com',
  messagingSenderId: '350399366704',
  appId: '1:350399366704:web:d7aff0f0c140fb65874ff5',
  measurementId: 'G-JVQ7XY6E04',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
