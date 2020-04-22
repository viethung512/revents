import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Segment, Header, Divider, Grid, Button } from 'semantic-ui-react';
import DropzoneInput from './DropzoneInput';
import CropperInput from './CropperInput';
import { toastr } from 'react-redux-toastr';
import { uploadProfileImage } from '../../userActions';
import UserPhotos from './UserPhotos';

const PhotosPage = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.firebase.auth);
  const { loading } = useSelector(state => state.async);
  const profile = useSelector(state => state.firebase.profile);

  const firestoreData = useSelector(state => state.firestore.ordered);

  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [photos, setPhotos] = useState([]);

  useFirestoreConnect(() => {
    if (auth.uid) {
      return {
        collection: 'users',
        doc: auth.uid,
        subcollections: [{ collection: 'photos' }],
        storeAs: 'photos',
      };
    }
  });

  useEffect(() => {
    if (firestoreData.photos) {
      const photoOfCurrentUser = Object.values(firestoreData.photos);
      setPhotos(photoOfCurrentUser);
    }
  }, [firestoreData.photos, auth.uid]);

  useEffect(() => {
    return () => {
      files.forEach(file => {
        URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);

  const handleUploadImage = async () => {
    try {
      await dispatch(uploadProfileImage(image, files[0].name));
      handleCancelCrop();
      toastr.success('Success', 'Photo has been uploaded');
    } catch (err) {
      console.log(err);
      toastr.error('Oops', 'Some thing went wrong');
    }
  };

  const handleCancelCrop = () => {
    setFiles([]);
    setImage(null);
  };

  return (
    <Segment>
      <Header dividing size='large' content='Your Photos' />
      <Grid>
        <Grid.Row />
        <Grid.Column width={4}>
          <Header color='teal' sub content='Step 1 - Add Photo' />
          <DropzoneInput setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color='teal' content='Step 2 - Resize image' />
          {files.length > 0 && (
            <CropperInput setImage={setImage} imagePreview={files[0].preview} />
          )}
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color='teal' content='Step 3 - Preview and Upload' />
          {files.length > 0 && (
            <Fragment>
              <div
                className='img-preview'
                style={{
                  minWidth: '200px',
                  minHeight: '200px',
                  overflow: 'hidden',
                }}
              />
              <Button.Group>
                <Button
                  onClick={handleUploadImage}
                  style={{ width: '100px' }}
                  positive
                  loading={loading}
                  icon='check'
                />
                <Button
                  disabled={loading}
                  onClick={handleCancelCrop}
                  style={{ width: '100px' }}
                  negative
                  icon='close'
                />
              </Button.Group>
            </Fragment>
          )}
        </Grid.Column>
      </Grid>

      <Divider />

      <UserPhotos photos={photos} photoProfile={profile.avatarUrl} />
    </Segment>
  );
};

export default PhotosPage;
