import React, { Component } from 'react';
import deepEqual from 'deep-equal';
import resource from 'app/util/resource';

/**
 * HOC for invoking a resource and supplying its response data to the wrapped component as a prop.
 *
 * @param {Object} opts Resource options.
 */
const withResource = (opts) => (WrappedComponent) =>
  class WithResourceHOC extends Component {
    state = {
      err: null,
      isLoaded: false,
      data: undefined,
    };

    componentDidMount() {
      this.invokeResource();
    }

    componentDidUpdate(prevProps) {
      const { data = () => ({}) } = opts;

      // Invoke the resource again if the params or data have changed (e.g., via a change in props
      // passed to the wrapper HOC)
      if (!deepEqual(data(this.props), data(prevProps))) {
        this.retry();
      }
    }

    onComplete = (err, data) => {
      this.setState({
        err,
        data,
        isLoaded: true,
      });
    };

    retry = () => {
      this.setState({
        err: null,
        isLoaded: false,
        data: undefined,
      });

      this.invokeResource();
    };

    invokeResource = () => {
      const {
        endpoint,
        data = () => ({}),
        method = 'GET',
      } = opts;

      resource({
        endpoint,
        method,
        data: data(this.props),
      }, this.onComplete);
    };

    render() {
      const { err, isLoaded, data } = this.state;
      const { key = 'resource' } = opts;

      const props = {
        ...this.props,
        [key]: {
          err,
          isLoaded,
          data,
          retry: this.retry,
        },
      };

      return (
        <WrappedComponent {...props} />
      );
    }
  };


export default withResource;
