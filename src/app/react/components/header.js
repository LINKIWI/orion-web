import React from 'react';
import PropTypes from 'prop-types';
import { LoadingBar } from 'react-elemental';

/**
 * Header for displaying network progress.
 */
const Header = ({ isLoading }) => (
  <div style={{ width: '100%' }}>
    {isLoading && <LoadingBar position="absolute" />}
  </div>
);

Header.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Header;
