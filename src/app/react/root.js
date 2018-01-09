import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Raven from 'raven-js';
import Error from 'app/react/components/error';
import routes from 'app/react/routes';
import withWindowDimensions from 'app/react/hoc/with-window-dimensions';
import { setWindowDimensions } from 'app/redux/actions/context';

/**
 * Global application root component, wrapping injection of document metadata.
 */
class Root extends Component {
  static propTypes = {
    handleWindowDimensionsChange: PropTypes.func.isRequired,
  };

  state = { error: null };

  componentWillMount() {
    this.props.handleWindowDimensionsChange();
  }

  componentDidUpdate() {
    this.props.handleWindowDimensionsChange();
  }

  componentDidCatch(error, info) {
    this.setState({ error });
    Raven.captureException(error, { extra: info });
  }

  render() {
    const { error } = this.state;

    return error ? (
      <Error />
    ) : (
      <div>
        {routes}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setWindowDimensions: (width, height) => dispatch(setWindowDimensions(width, height)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  handleWindowDimensionsChange: () =>
    dispatchProps.setWindowDimensions(ownProps.width, ownProps.height),
});

export default compose(
  withWindowDimensions,
  connect(null, mapDispatchToProps, mergeProps),
)(Root);
