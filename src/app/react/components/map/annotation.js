import React from 'react';
import PropTypes from 'prop-types';
import { colors, Spacing, Text } from 'react-elemental';

// Offsets between the target rendering pixel position and its actual position.
const HORIZONTAL_OFFSET = 10;
const VERTICAL_OFFSET = 10;

/**
 * Interactive spatial annotation on the map.
 */
const Annotation = ({ x, y, annotations }) => (
  <Spacing
    size="18px"
    style={{
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      left: x + HORIZONTAL_OFFSET,
      position: 'absolute',
      top: y + VERTICAL_OFFSET,
    }}
    top
    left
    bottom
    right
    padding
  >
    {annotations.map(({ heading, value }, idx) => (
      <Spacing key={heading} size="small" bottom={idx < annotations.length - 1}>
        <Spacing size="micro" bottom>
          <Text color={colors.primary} size="lambda" uppercase bold>
            {heading}
          </Text>
        </Spacing>

        <Text size="kilo" color={colors.gray40}>
          {value}
        </Text>
      </Spacing>
    ))}
  </Spacing>
);

Annotation.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  annotations: PropTypes.arrayOf(PropTypes.shape({
    heading: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
};

export default Annotation;
