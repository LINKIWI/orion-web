import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';
import { setAnimation } from 'app/redux/actions/map';

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
const withMotion = (opts) => (WrappedComponent) => {
  const WithMotionHOC = (props) => {
    const { animationProperties, animationStyle } = opts(props);

    const style = Object.keys(animationProperties)
      .reduce((acc, key) =>
        Object.assign({}, acc, { [key]: spring(animationProperties[key], animationStyle) }), {});

    return (
      <Motion style={style} onRest={props.disableAnimation}>
        {(motionProps) => (
          <WrappedComponent
            {...props}
            {...animationProperties}
            {...props.animation && motionProps}
          />
        )}
      </Motion>
    );
  };

  WithMotionHOC.propTypes = {
    animation: PropTypes.bool.isRequired,
    disableAnimation: PropTypes.func.isRequired,
  };

  const mapStateToProps = ({ map }) => ({
    animation: map.animation,
  });

  const mapDispatchToProps = (dispatch) => ({
    disableAnimation: () => dispatch(setAnimation(false)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithMotionHOC);
};

export default withMotion;
