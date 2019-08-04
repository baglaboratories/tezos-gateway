import createAction from 'utils/action';

// ---------------------------------------
// Action list
// ---------------------------------------

const actionPrefix = 'HOME';

export const BEGIN_FETCHING_ACCOUNT = `${actionPrefix}_BEGIN_FETCHING_ACCOUNT`;
export const END_FETCHING_ACCOUNT = `${actionPrefix}_END_FETCHING_ACCOUNT`;
export const BEGIN_FETCHING_LEDGER_ACCOUNT = `${actionPrefix}_BEGIN_FETCHING_LEDGER_ACCOUNT`;
export const END_FETCHING_LEDGER_ACCOUNT = `${actionPrefix}_END_FETCHING_LEDGER_ACCOUNT`;

export const fetchAccountFromContract = (tez, address, type) => async (dispatch) => {
  if (type === 'ledger') {
    dispatch(createAction(BEGIN_FETCHING_LEDGER_ACCOUNT));
  } else {
    dispatch(createAction(BEGIN_FETCHING_ACCOUNT));
  }

  const { args } = await tez.query('/chains/main/blocks/head/context/contracts/KT1DMBFZ4f6PUHoG3Du5VXEW4XqKfBfoeWJs/storage'); // eslint-disable-line

  if (type === 'ledger') {
    dispatch(createAction(END_FETCHING_LEDGER_ACCOUNT));
  } else {
    dispatch(createAction(END_FETCHING_ACCOUNT));
  }

  const accounts = args[0];
  const foundAccount = accounts.find(account => account.args[0].string === address);

  if (foundAccount) {
    return {
      address: foundAccount.args[0].string,
      credits: parseInt(foundAccount.args[1].int, 10),
    };
  }

  return null;
};

export default {};
