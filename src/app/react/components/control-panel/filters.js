import React from 'react';
import PropTypes from 'prop-types';
import { Spacing, Text } from 'react-elemental';
import Slider from 'app/react/components/ui/slider';

// Function to format the numerical values displayed in the slider for display.
const formatAccuracyValue = (val) => `${val.toFixed(1)} m`;

/**
 * Controls for filtering visualized data.
 */
const Filters = ({ threshold, minAccuracy, maxAccuracy, onAccuracyThresholdChange }) => (
  <div>
    <Spacing size="small" bottom>
      <Text uppercase bold>
        Filters
      </Text>
    </Spacing>

    <Spacing size="tiny" bottom>
      <Text size="kilo" color="gray50" uppercase bold>
        Accuracy
      </Text>
      <Text size="lambda" color="gray25">
        Filter out points less than a threshold accuracy (meters).
      </Text>
    </Spacing>

    <Slider
      min={minAccuracy}
      max={maxAccuracy}
      value={threshold}
      formatter={formatAccuracyValue}
      onChange={onAccuracyThresholdChange}
      width={500}
    />
  </div>
);

Filters.propTypes = {
  threshold: PropTypes.number.isRequired,
  minAccuracy: PropTypes.number.isRequired,
  maxAccuracy: PropTypes.number.isRequired,
  onAccuracyThresholdChange: PropTypes.func.isRequired,
};

export default Filters;
