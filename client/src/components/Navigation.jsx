import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import { Menu } from 'semantic-ui-react';

import styles from './css/navigation.scss';

const STYLES = {
  MENU: styles.menu,
  LOGO: styles.logo,
};

const Navigation = ({
  activeItem,
  handleItemClick,
}) => (
  <Menu className={STYLES.MENU} borderless stackable secondary>
    <Link to="/">
      <Menu.Item>
        <img alt="tezos-logo" src="/img/tezos_cutout_blue.png" />
        Tezos Gateway
      </Menu.Item>
    </Link>

    <Menu.Item
      name="learn"
      active={activeItem === 'learn'}
      onClick={handleItemClick}
    >
      Learn More
    </Menu.Item>
  </Menu>
);

Navigation.defaultProps = {
  activeItem: 'learn',
};

Navigation.propTypes = {
  activeItem: PropTypes.string,
  handleItemClick: PropTypes.func.isRequired,
};

export default Navigation;
