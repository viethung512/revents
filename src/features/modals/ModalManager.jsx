import React from 'react';
import { useSelector } from 'react-redux';
import TestModal from './TestModal';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import UnauthModal from './UnauthModal';

const modalLookup = {
  TestModal,
  LoginModal,
  RegisterModal,
  UnauthModal,
};

function ModalManager() {
  const currentModal = useSelector(state => state.modals);
  let renderModal;

  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];

    renderModal = <ModalComponent {...modalProps} />;
  }
  return <span>{renderModal}</span>;
}

export default ModalManager;
