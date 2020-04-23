import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';
import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedDescription from './UserDetailedDescription';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedEvents from './UserDetailedEvents';
import UserDetailedSidebar from './UserDetailedSidebar';
import LoadingComponents from '../../../app/layout/LoadingComponents';

const UserDetailedPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [photos, setPhotos] = useState([]);
  const firestoreData = useSelector(state => state.firestore.ordered);
  const requesting = useSelector(state => state.firestore.status.requesting);
  const auth = useSelector(state => state.firebase.auth);

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

  const isCurrentUser = auth.uid === id;
  const loading = Object.values(requesting).some(a => a === true);

  return (
    <Grid>
      {loading ? (
        <LoadingComponents />
      ) : (
        <Fragment>
          <UserDetailedHeader user={user} />
          <UserDetailedDescription user={user} />
          <UserDetailedSidebar isCurrentUser={isCurrentUser} />
          {photos && photos.length > 0 && (
            <UserDetailedPhotos photos={photos} />
          )}

          <UserDetailedEvents />
        </Fragment>
      )}
    </Grid>
  );
};

export default UserDetailedPage;
