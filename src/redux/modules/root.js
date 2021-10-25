import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import car from './car/reducer';
import { getCarListEpic } from './car/epics';

export const rootEpic = combineEpics(
  getCarListEpic,
);

export const rootReducer = combineReducers({
  car
})