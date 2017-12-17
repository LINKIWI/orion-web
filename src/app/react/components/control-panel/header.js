import React from 'react';
import PropTypes from 'prop-types';
import { colors, Text } from 'react-elemental';
import KeyboardArrowUp from 'react-icons/lib/md/keyboard-arrow-up';

/**
 * Control panel header exposing ability to collapse the entire panel.
 */
const Header = ({ isExpanded, onExpandClick }) => (
  <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
    <Text size="epsilon" uppercase bold>
      Orion
    </Text>

    <div onClick={onExpandClick} style={{ cursor: 'pointer' }}>
      <KeyboardArrowUp
        style={{
          color: colors.gray50,
          fontSize: '24px',
          transform: `rotate(${isExpanded ? 0 : 180}deg)`,
          transition: 'all 0.3s ease',
        }}
      />
    </div>
  </div>
);

Header.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  onExpandClick: PropTypes.func.isRequired,
};

export default Header;
