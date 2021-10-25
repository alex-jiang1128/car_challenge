import {
  GET_CAR_LIST,
  GET_CAR_LIST_SUCCESS,
  GET_CAR_LIST_ERROR,
} from "./actions";

const initialState = {
  items: [],
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
};

const car = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CAR_LIST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_CAR_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: payload,
        error: null,
      };
    case GET_CAR_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default car;
