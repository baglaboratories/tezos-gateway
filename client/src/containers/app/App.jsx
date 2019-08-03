import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import createAction from 'utils/action';

import Navigation from 'components/Navigation';

import RootRoute from '../../routes';
import { appProp } from './app.reducers';

import styles from './css/app.scss';

const STYLES = {
  CONTENT: styles.content,
};

class App extends Component {
  state = { activeItem: 'learn' }

  componentDidMount() {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;

    return (
      <React.Fragment>
        <Navigation
          activeItem={activeItem}
          handleItemClick={this.handleItemClick}
        />
        <div className={STYLES.CONTENT}>
          <RootRoute />
        </div>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  app: appProp.isRequired,
};

export default connect(state => ({ ...state }))(App);
