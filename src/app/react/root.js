import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
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

  componentWillMount() {
    this.props.handleWindowDimensionsChange();
  }

  componentDidUpdate() {
    this.props.handleWindowDimensionsChange();
  }

  render() {
    return (
      <div>
        <Helmet>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
          />
        </Helmet>

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
