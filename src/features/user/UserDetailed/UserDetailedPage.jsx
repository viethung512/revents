import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';
import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedDescription from './UserDetailedDescription';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedEvents from './UserDetailedEvents';
import UserDetailedSidebar from './UserDetailedSidebar';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { objectToArray } from '../../../app/common/util/helper';
import { getUserEvents } from '../userActions';

const UserDetailedPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(({ firestore: { data } }) =>
    data.currentUser ? { ...data.currentUser, id } : {}
  );
  const photos = useSelector(({ firestore: { data } }) =>
    data.photos ? objectToArray(data.photos) : []
  );
  const { events } = useSelector(state => state.user);
  const requesting = useSelector(state => state.firestore.status.requesting);
  const { loading: eventsLoading } = useSelector(state => state.async);
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
    dispatch(getUserEvents(id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeTab = (e, data) => dispatch(getUserEvents(id, data.activeIndex));

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

          <UserDetailedEvents
            events={events}
            eventsLoading={eventsLoading}
            changeTab={changeTab}
          />
        </Fragment>
      )}
    </Grid>
  );
};

export default UserDetailedPage;
