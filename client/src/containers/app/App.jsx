import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Home from 'containers/home/home.route';
import Learn from 'containers/learn/learn.route';
import Navigation from 'components/Navigation';

import styles from './css/app.scss'; // eslint-disable-line

class App extends Component {
  state = {}

  render() {
    return (
      <>
        <Route path="/" component={Navigation} />
        <div style={{ padding: 15 }}>
          <Route exact path="/" component={Home} />
          <Route path="/learn-more" component={Learn} />
        </div>
      </>
    );
  }
}

export default connect(state => ({ ...state }))(App);
