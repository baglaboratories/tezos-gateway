import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import createAction from 'utils/action';

import { Card } from 'semantic-ui-react';

import { SET_PAGE_TITLE } from '../app/app.actions';

import styles from './css/home.scss';

const STYLES = {
  CARD: styles.card,
};

class Home extends Component {
  state = {}

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(createAction(SET_PAGE_TITLE, 'Tezos Gateway'));
  }

  render() {
    return (
      <>
        <Card fluid className={STYLES.CARD}>
          <Card.Content>
            <Card.Header>Tezos Gateway</Card.Header>
          </Card.Content>
        </Card>
      </>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(state => ({ ...state }))(Home);
