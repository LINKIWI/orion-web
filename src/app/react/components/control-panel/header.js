import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { colors } from 'react-elemental';
import KeyboardArrowUp from 'react-icons/lib/md/keyboard-arrow-up';
import Logo from 'app/react/components/logo';

/**
 * Control panel header exposing ability to collapse the entire panel.
 */
export default class Header extends Component {
  static propTypes = {
    isExpanded: PropTypes.bool.isRequired,
    isCompact: PropTypes.bool.isRequired,
    onExpandClick: PropTypes.func.isRequired,
  };

  handleExpansionToggleClick = (evt) => {
    evt.preventDefault();
    this.props.onExpandClick();
  };

  render() {
    const { isExpanded, isCompact } = this.props;

    return (
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
        <Logo
          style={{
            height: (isCompact && !isExpanded) ? '20px' : '40px',
            transition: 'all 0.15s ease',
            width: 'auto',
          }}
        />

        <a href="#" onClick={this.handleExpansionToggleClick}>
          <KeyboardArrowUp
            style={{
              color: colors.gray50,
              fontSize: '24px',
              transform: `rotate(${isExpanded ? 0 : 180}deg)`,
              transition: 'all 0.3s ease',
            }}
          />
        </a>
      </div>
    );
  }
}
