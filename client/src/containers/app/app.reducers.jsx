import { PropTypes } from 'prop-types';
import { combineReducers } from 'redux';

import { SET_PAGE_TITLE } from './app.actions';

const pageTitle = (state = 'Tezos Gateway', action) => {
  switch (action.type) {
    case SET_PAGE_TITLE:
      document.title = action.payload || state;
      return document.title;
    default:
      return state;
  }
};

export const appProp = PropTypes.shape({
  pageTitle: PropTypes.string,
});

export default combineReducers({
  pageTitle,
});
