import commonSlice from './reducers/common.slice';
import projectSlice from './reducers/project.slice';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  common: commonSlice,
  project: projectSlice,
});

export default rootReducer;
