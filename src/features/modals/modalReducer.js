import { MODAL_OPEN, MODAL_CLOSE } from './modalConstants';

const initState = null;

export default function (state = initState, { type, payload }) {
  switch (type) {
    case MODAL_OPEN:
      const { modalType, modalProps } = payload;
      return { modalType, modalProps };
    case MODAL_CLOSE:
      return null;
    default:
      return state;
  }
}
