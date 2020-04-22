import { toastr } from 'react-redux-toastr';
import cuid from 'cuid';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from '../async/asyncActions';

export const updateProfile = user => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const { isLoaded, isEmpty, ...updatedUser } = user;

  try {
    await firebase.updateProfile(updatedUser);
    toastr.success('Success', 'Your profile has been updated');
  } catch (err) {
    console.log(err);
  }
};

export const uploadProfileImage = (file, fileName) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const imageName = cuid();
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const path = `${user.uid}/user_images/`;
  const options = { name: imageName };

  try {
    dispatch(asyncActionStart());
    // upload the file to firebase storage
    let uploadedFile = await firebase.uploadFile(path, file, null, options);

    // get url of the image
    let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
    // get userdoc
    let userDoc = await firestore.get(`users/${user.uid}`);

    // check if user has photo, if not => update profile
    if (!userDoc.data().avatarUrl) {
      await firebase.updateProfile({ avatarUrl: downloadURL });
      await user.updateProfile({ avatarUrl: downloadURL });
    }

    // add the image to firestore
    await firestore.add(
      {
        collection: 'users',
        doc: user.uid,
        subcollections: [{ collection: 'photos' }],
      },
      { name: imageName, url: downloadURL }
    );
    dispatch(asyncActionFinish());
  } catch (err) {
    console.log(err);
    dispatch(asyncActionError());
  }
};

export const deletePhoto = photo => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;

  try {
    await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
    await firestore.delete({
      collection: 'users',
      doc: user.uid,
      subcollections: [{ collection: 'photos', doc: photo.id }],
    });
  } catch (err) {
    console.log(err);
    throw new Error('Problem deleting the photo');
  }
};

export const setMainPhoto = photo => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();

  try {
    return await firebase.updateProfile({ avatarUrl: photo.url });
  } catch (err) {
    console.log(err);
    throw new Error('Problem setting main photo');
  }
};
