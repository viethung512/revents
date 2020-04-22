import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';
import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedDescription from './UserDetailedDescription';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedEvents from './UserDetailedEvents';
import UserDetailedSidebar from './UserDetailedSidebar';

const UserDetailedPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [photos, setPhotos] = useState([]);
  const firestoreData = useSelector(state => state.firestore.ordered);
  useFirestoreConnect({
    collection: 'users',
    doc: id,
    storeAs: 'currentUser',
  });
  useFirestoreConnect({
    collection: 'users',
    doc: id,
    subcollections: [{ collection: 'photos' }],
    storeAs: 'photos',
  });

  useEffect(() => {
    if (firestoreData.currentUser && firestoreData.currentUser.length > 0) {
      setUser(firestoreData.currentUser[0]);
    }
    if (firestoreData.photos) {
      setPhotos(firestoreData.photos);
    }
  }, [firestoreData]);

  return (
    <Grid>
      <UserDetailedHeader user={user} />
      <UserDetailedDescription user={user} />
      <UserDetailedSidebar />
      {photos && photos.length > 0 && <UserDetailedPhotos photos={photos} />}

      <UserDetailedEvents />
    </Grid>
  );
};

export default UserDetailedPage;
