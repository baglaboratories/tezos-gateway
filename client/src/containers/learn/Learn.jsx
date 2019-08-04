import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import createAction from 'utils/action';

import { Card } from 'semantic-ui-react';

import { SET_PAGE_TITLE } from '../app/app.actions';

import styles from './css/learn.scss';

const STYLES = {
  CARD: styles.card,
};

class Learn extends Component {
  state = {}

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(createAction(SET_PAGE_TITLE, 'Tezos Gateway - Learn More'));
  }

  render() {
    return (
      <>
        <Card fluid className={STYLES.CARD}>
          <Card.Content>
            <Card.Header>Tezos Gateway - Learn More</Card.Header>
          </Card.Content>
        </Card>
      </>
    );
  }
}

Learn.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(state => ({ ...state }))(Learn);
