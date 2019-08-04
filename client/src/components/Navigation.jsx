import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Menu } from 'semantic-ui-react';

import styles from './css/navigation.scss';

const STYLES = {
  MENU: styles.menu,
  LOGO: styles.logo,
  LOGO_TEXT: styles.logoText,
};

const Navigation = ({ location }) => (
  <Menu className={STYLES.MENU} borderless stackable secondary>
    <Link to="/">
      <Menu.Item>
        <img
          className={STYLES.LOGO}
          alt="tezos-logo"
          src="/img/tezos_cutout_blue.png"
        />
        <span className={STYLES.LOGO_TEXT}>Tezos Gateway</span>
      </Menu.Item>
    </Link>

    <Menu.Item
      name="home"
      active={location.pathname === '/'}
    >
      <Link to="/">
        Home
      </Link>
    </Menu.Item>

    <Menu.Item
      name="learn"
      active={location.pathname === '/learn-more'}
    >
      <Link to="/learn-more">
        Learn More
      </Link>
    </Menu.Item>
  </Menu>
);

Navigation.defaultProps = {
  location: {
    pathname: '/',
  },
};

Navigation.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

export default Navigation;
