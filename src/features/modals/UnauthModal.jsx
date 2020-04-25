import React from 'react';
import { Modal, Button, Divider } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { closeModal, openModal } from './modalActions';

const UnauthModal = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const handleCloseModal = () => {
    if (!location.pathname.includes('/event')) {
      history.goBack();
    }
    dispatch(closeModal());
  };
  const handleOpenModal = modal => dispatch(openModal(modal));

  return (
    <Modal size='mini' open={true} onClose={handleCloseModal}>
      <Modal.Header>You need to be signed in to do that!</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>Please either login or register to see this page</p>
          <Button.Group widths={4}>
            <Button
              fluid
              color='teal'
              onClick={() => handleOpenModal('LoginModal')}
            >
              Login
            </Button>
            <Button.Or />
            <Button
              fluid
              positive
              onClick={() => handleOpenModal('RegisterModal')}
            >
              Register
            </Button>
          </Button.Group>
          <Divider />
          <div style={{ textAlign: 'center' }}>
            <p>Or click cancel to continue as a guest</p>
            <Button onClick={handleCloseModal}>Cancel</Button>
          </div>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default UnauthModal;
