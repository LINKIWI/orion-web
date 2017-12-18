import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import { colors } from 'react-elemental';
import match from 'functional-match';

/**
 * Responsive dot used in the slider component.
 */
export default class Dot extends Component {
  static propTypes = {
    isDragging: PropTypes.bool,
    offset: PropTypes.number,
    size: PropTypes.number,
    style: PropTypes.object,
  };

  static defaultProps = {
    isDragging: false,
    offset: 0,
    size: 16,
    style: {},
  };

  constructor(props) {
    super(props);

    this.clickColor = colors.primary;
    this.idleColor = new Color(colors.primary).lighten(0.2).string();
    this.hoverColor = new Color(colors.primary).lighten(0.3).string();
  }

  state = { isHover: false };

  handleHoverChange = (isHover) => () => this.setState({ isHover });

  render() {
    const { isDragging, offset, size, style, ...props } = this.props;
    const { isHover } = this.state;

    const backgroundColor = match(true, [
      [isDragging, this.clickColor],
      [isHover, this.hoverColor],
    ], this.idleColor);

    return (
      <div
        onMouseEnter={this.handleHoverChange(true)}
        onMouseLeave={this.handleHoverChange(false)}
        style={{
          backgroundColor,
          borderRadius: `${size}px`,
          height: `${size}px`,
          left: `${offset}px`,
          position: 'relative',
          transition: 'background-color 0.15s ease',
          width: `${size}px`,
          ...style,
        }}
        {...props}
      />
    );
  }
}
