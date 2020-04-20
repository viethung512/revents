import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERROR,
} from './asyncConstants';

const asyncReducerInitialState = {
  loading: false,
  elementName: null,
};

const asyncReducer = (state = asyncReducerInitialState, { type, payload }) => {
  switch (type) {
    case ASYNC_ACTION_START:
      return {
        ...state,
        loading: true,
        elementName: payload,
      };
    case ASYNC_ACTION_FINISH:
    case ASYNC_ACTION_ERROR:
      return {
        ...state,
        loading: false,
        elementName: null,
      };
    default:
      return state;
  }
};

export default asyncReducer;
