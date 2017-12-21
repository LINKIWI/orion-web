import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';

/**
 * Higher-order component for abstracting out adding transition motion to props of a component.
 *
 * @param {Function} opts Unary function taking the current props as an argument. Should return an
 *                        object containing two keys: `style` dictating the style to pass to
 *                        react-motion, and `threshold`, a unary function (taking nextProps as an
 *                        argument) that dictates whether the props transition warrants enabling
 *                        animation.
 * @returns {Function} Function taking a component to wrap, which returns a component instance
 *                     containing automatic props animation.
 */
const withMotion = (opts) => (WrappedComponent) =>
  class WithMotionHOC extends Component {
    state = { shouldAnimate: false };

    componentWillReceiveProps(nextProps) {
      const { threshold } = opts(this.props);

      if (threshold(nextProps)) {
        this.setState({ shouldAnimate: true });
      }
    }

    handleRest = () => this.setState({ shouldAnimate: false });

    render() {
      const { animationProperties, animationStyle } = opts(this.props);
      const { shouldAnimate } = this.state;

      const style = Object.keys(animationProperties)
        .reduce((acc, key) =>
          Object.assign({}, acc, { [key]: spring(animationProperties[key], animationStyle) }), {});

      return (
        <Motion style={style} onRest={this.handleRest}>
          {(motionProps) => (
            <WrappedComponent
              {...this.props}
              {...animationProperties}
              {...shouldAnimate && motionProps}
            />
          )}
        </Motion>
      );
    }
  };

export default withMotion;
