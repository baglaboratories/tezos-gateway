import { PropTypes } from 'prop-types';
import { combineReducers } from 'redux';

import {
  BEGIN_FETCHING_ACCOUNT,
  END_FETCHING_ACCOUNT,
  BEGIN_FETCHING_LEDGER_ACCOUNT,
  END_FETCHING_LEDGER_ACCOUNT,
} from './home.actions';

const fetchingAccount = (state = false, action) => {
  switch (action.type) {
    case BEGIN_FETCHING_ACCOUNT:
      return true;
    case END_FETCHING_ACCOUNT:
      return false;
    default:
      return state;
  }
};

const fetchingLedgerAccount = (state = false, action) => {
  switch (action.type) {
    case BEGIN_FETCHING_LEDGER_ACCOUNT:
      return true;
    case END_FETCHING_LEDGER_ACCOUNT:
      return false;
    default:
      return state;
  }
};


export const homeProp = PropTypes.shape({
  fetchingAccount: PropTypes.bool,
  fetchingLedgerAccount: PropTypes.bool,
});

export default combineReducers({
  fetchingAccount,
  fetchingLedgerAccount,
});
