export const GET_CAR_LIST = 'GET_CAR_LIST';
export const GET_CAR_LIST_SUCCESS = 'GET_CAR_LIST_SUCCESS';
export const GET_CAR_LIST_ERROR = 'GET_CAR_LIST_ERROR';

export const getCarList = (search) => ({
  type: GET_CAR_LIST,
  payload: search
});

export const getCarListSuccess = (data) => ({
  type: GET_CAR_LIST_SUCCESS,
  payload: data
});

export const getCarListError = (error) => ({
  type: GET_CAR_LIST_ERROR,
  playload: error,
});