import React from 'react';
import PropTypes from 'prop-types';
import { colors, Spacing, Text } from 'react-elemental';

/**
 * Segmented tabs allowing a single selection from multiple options.
 */
const Tabs = ({ options, selected, onChange, style }) => (
  <div style={{ display: 'flex', justifyContent: 'space-around', ...style }}>
    {options.map(({ value, label }, idx) => (
      <div
        key={label}
        onClick={() => onChange(label)}
        style={{
          backgroundColor: selected === label ? colors.gray10 : 'inherit',
          border: `1px solid ${colors.gray10}`,
          cursor: 'pointer',
          flex: 1,
          textAlign: 'center',
          transition: 'background-color 0.15s ease',
          ...idx < options.length - 1 && { borderRight: 'none' },
        }}
      >
        <Spacing size="tiny" top bottom padding>
          <Text color="gray60">
            {value}
          </Text>
        </Spacing>
      </div>
    ))}
  </div>
);

Tabs.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object,
};

Tabs.defaultProps = {
  selected: null,
  style: {},
};

export default Tabs;
