import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from 'app/react/components/header';

/**
 * Redux store wrapper around the global header.
 */
const HeaderContainer = ({ isLoading }) => (
  <Header isLoading={isLoading} />
);

HeaderContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ progress }) => ({
  isLoading: progress.isLoading,
});

export default connect(mapStateToProps)(HeaderContainer);
