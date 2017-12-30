import React, { Component } from 'react';

/**
 * Higher-order component factory for creating an HOC that supplies the current window width and
 * height to the wrapped child component.
 *
 * @param {Component} WrappedComponent Component to wrap.
 * @returns {Component} Higher-order component that instantiates the child component with additional
 *                      window width and height props.
 */
const withWindowDimensions = (WrappedComponent) =>
  class WithWindowDimensionsHOC extends Component {
    state = { width: null, height: null };

    componentDidMount() {
      window.addEventListener('resize', this.onResize);

      this.onResize();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.onResize);
    }

    onResize = () => this.setState({ width: window.innerWidth, height: window.innerHeight });

    render() {
      const { width, height } = this.state;

      if (width === null || height === null) {
        return null;
      }

      return (
        <WrappedComponent
          {...this.props}
          width={width}
          height={height}
        />
      );
    }
  };

export default withWindowDimensions;
