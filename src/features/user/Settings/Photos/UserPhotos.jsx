import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Image, Button, Header } from 'semantic-ui-react';
import { toastr } from 'react-redux-toastr';
import { deletePhoto, setMainPhoto } from '../../userActions';

function UserPhotos({ photoProfile, photos }) {
  const dispatch = useDispatch();

  const handleDeletePhoto = photo => {
    try {
      dispatch(deletePhoto(photo));
    } catch (err) {
      toastr.error('Oops', err.message);
    }
  };

  const handleSetMainPhoto = photo => {
    try {
      dispatch(setMainPhoto(photo));
    } catch (err) {
      toastr.error('Oops', err.message);
    }
  };
  return (
    <Fragment>
      <Header sub color='teal' content='All Photos' />

      <Card.Group itemsPerRow={5}>
        <Card>
          <Image src={photoProfile || '/assets/user.png'} />
          <Button positive>Main Photo</Button>
        </Card>

        {photos
          .filter(photo => photo.url !== photoProfile)
          .map(photo => (
            <Card key={photo.url}>
              <Image src={photo.url} />
              <div className='ui two buttons'>
                <Button
                  basic
                  color='green'
                  onClick={() => handleSetMainPhoto(photo)}
                >
                  Main
                </Button>
                <Button
                  basic
                  icon='trash'
                  color='red'
                  onClick={() => handleDeletePhoto(photo)}
                />
              </div>
            </Card>
          ))}
      </Card.Group>
    </Fragment>
  );
}

export default UserPhotos;
