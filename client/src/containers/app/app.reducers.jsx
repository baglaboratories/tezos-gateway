import { PropTypes } from 'prop-types';
import { combineReducers } from 'redux';

import {
  SET_PAGE_TITLE,
  SET_ACCOUNT,
  CLEAR_ACCOUNT,
} from './app.actions';

const pageTitle = (state = 'Tezos Gateway', action) => {
  switch (action.type) {
    case SET_PAGE_TITLE:
      document.title = action.payload || state;
      return document.title;
    default:
      return state;
  }
};

const account = (state = null, action) => {
  switch (action.type) {
    case SET_ACCOUNT:
      return action.payload;
    case CLEAR_ACCOUNT:
      return null;
    default:
      return state;
  }
};

export const appProp = PropTypes.shape({
  pageTitle: PropTypes.string,
  account: PropTypes.shape({
    address: PropTypes.string,
    credits: PropTypes.number,
  }),
});

export default combineReducers({
  pageTitle,
  account,
});
