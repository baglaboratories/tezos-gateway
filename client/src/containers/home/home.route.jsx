import React from 'react';
import loadable from 'react-loadable';

const LoadingComponent = () => <h3>please wait...</h3>;
const Home = () => import('./Home');

const AsyncHomeComponent = loadable({
  loader: Home,
  loading: LoadingComponent,
});

export default AsyncHomeComponent;
