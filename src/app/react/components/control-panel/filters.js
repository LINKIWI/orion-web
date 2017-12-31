import React from 'react';
import PropTypes from 'prop-types';
import { Spacing, Text } from 'react-elemental';
import Slider from 'app/react/components/ui/slider';

// Function to format the numerical values displayed in the slider for display.
const formatAccuracyValue = (val) => `${val.toFixed(1)} m`;

/**
 * Controls for filtering visualized data.
 */
const Filters = ({ threshold, minAccuracy, maxAccuracy, width, onAccuracyThresholdChange }) => (
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
        Filter out points less than a threshold accuracy (meters)
      </Text>
    </Spacing>

    <Slider
      min={minAccuracy}
      max={maxAccuracy}
      value={threshold}
      formatter={formatAccuracyValue}
      onChange={onAccuracyThresholdChange}
      width={width}
    />
  </div>
);

Filters.propTypes = {
  // Current accuracy threshold value
  threshold: PropTypes.number.isRequired,
  // Minimum allowable threshold (left end of slider)
  minAccuracy: PropTypes.number.isRequired,
  // Maximum allowable threshold (right end of slider)
  maxAccuracy: PropTypes.number.isRequired,
  // Width (in pixels) of the slider
  width: PropTypes.number.isRequired,
  // Callback function to invoke when the threshold is moved (slider is updated)
  onAccuracyThresholdChange: PropTypes.func.isRequired,
};

export default Filters;
