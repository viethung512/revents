import React from 'react';
import { useSelector } from 'react-redux';
import TestModal from './TestModal';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const modalLookup = {
  TestModal,
  LoginModal,
  RegisterModal,
};

function ModalManager() {
  const currentModal = useSelector(state => state.modals);
  let rendereModal;

  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];

    rendereModal = <ModalComponent {...modalProps} />;
  }
  return <span>{rendereModal}</span>;
}

export default ModalManager;
