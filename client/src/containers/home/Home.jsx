import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import createAction from 'utils/action';
import Sotez from 'sotez';

import { Button, Card, Input } from 'semantic-ui-react';
import Blockies from 'components/Blockies';

import {
  SET_PAGE_TITLE,
  SET_ACCOUNT,
  CLEAR_ACCOUNT,
} from 'containers/app/app.actions';

import { appProp } from 'containers/app/app.reducers';
import { homeProp } from 'containers/home/home.reducers';

import { fetchAccountFromContract } from './home.actions';

import styles from './css/home.scss';

const STYLES = {
  CARD: styles.card,
};

const sotez = new Sotez('https://alphanet-node.tzscan.io', 'main', 'alpha');

class Home extends Component {
  state = {
    keyInput: '',
  }

  componentDidMount() {
    const {
      dispatch,
      app: {
        account,
      },
    } = this.props;

    dispatch(createAction(SET_PAGE_TITLE, 'Tezos Gateway'));
    this.setState({ keyInput: account });
  }

  handleKeyInput = value => this.setState({ keyInput: value })

  fetchAccount = async (type) => {
    const { dispatch } = this.props;
    const { keyInput } = this.state;

    let address;
    if (type === 'ledger') {
      try {
        await sotez.importLedger();
        address = sotez.publicKeyHash();
      } catch (e) {
        throw new Error(e);
      }
    } else {
      address = keyInput;
    }

    const account = await dispatch(fetchAccountFromContract(sotez, address, type));

    if (account) {
      return dispatch(createAction(SET_ACCOUNT, account));
    }

    return dispatch(createAction(CLEAR_ACCOUNT));
  }

  render() {
    const {
      app: {
        account,
      },
      home: {
        fetchingAccount,
        fetchingLedgerAccount,
      },
    } = this.props;

    return (
      <>
        <Card fluid className={STYLES.CARD}>
          <Card.Content>
            <Card.Header>Add Credits to Your Account</Card.Header>
          </Card.Content>
          <Card.Content>
            Enter your public key hash or import your ledger address to check your balance or add additional credits.
            <div className="flex flex--align-center flex--direction-column pad-lg">
              <Input
                style={{ width: '100%' }}
                placeholder="tz1..."
                onChange={(e, { value }) => this.handleKeyInput(value)}
                action
              >
                <input />
                <Button
                  type="submit"
                  onClick={this.fetchAccount}
                  loading={fetchingAccount}
                >
                  Search
                </Button>
              </Input>
              <div className="pad-vert-md">Or</div>
              <div>
                <Button
                  onClick={() => this.fetchAccount('ledger')}
                  loading={fetchingLedgerAccount}
                >
                  Import Ledger Public Key
                </Button>
              </div>
            </div>
          </Card.Content>
        </Card>
        {
          account && (
            <Card fluid className={STYLES.CARD}>
              <Card.Content>
                <Card.Header>Account Overview</Card.Header>
              </Card.Content>
              <Card.Content>
                <div>
                  <Blockies
                    address={account.address}
                    spotColor="#000"
                    scale={15}
                    size={8}
                  />
                </div>
                <div className="text-body-1">
                  <div className="pad-sm">
                    <span className="text-body-2">Address:</span>
                    {` ${account.address}`}
                  </div>
                  <div className="pad-sm">
                    <span className="text-body-2">Credits:</span>
                    {` ${account.credits}`}
                  </div>
                </div>
              </Card.Content>
            </Card>
          )
        }
      </>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  app: appProp.isRequired,
  home: homeProp.isRequired,
};

export default connect(state => ({ ...state }))(Home);
