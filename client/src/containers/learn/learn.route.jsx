import React from 'react';
import loadable from 'react-loadable';

const LoadingComponent = () => <h3>please wait...</h3>;
const Learn = () => import('./Learn');

const AsyncLearnComponent = loadable({
  loader: Learn,
  loading: LoadingComponent,
});

export default AsyncLearnComponent;
