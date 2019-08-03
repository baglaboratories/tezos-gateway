import { combineReducers } from 'redux';
import app from 'containers/app/app.reducers';
import home from 'containers/home/home.reducers';

// Root level reducer
const mainReducer = combineReducers({
  app,
  home,
});

export default mainReducer;
