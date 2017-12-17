import React from 'react';
import PropTypes from 'prop-types';
import { Spacing, Text } from 'react-elemental';
import Tabs from 'app/react/components/ui/tabs';
import {
  LOCATION_DISPLAY_TYPE_DOTS,
  LOCATION_DISPLAY_TYPE_PATH,
  LOCATION_DISPLAY_TYPE_HEATMAP,
} from 'app/redux/reducers/options';

const Options = ({ locationDisplayType, onLocationDisplayTypeChange }) => (
  <div>
    <Spacing size="small" bottom>
      <Text uppercase bold>
        Display options
      </Text>
    </Spacing>

    <Spacing size="tiny" bottom>
      <Text size="kilo" color="gray50" uppercase bold>
        Location representation
      </Text>
      <Text size="lambda" color="gray25">
        Choose how location data is displayed on the map.
      </Text>
    </Spacing>

    <Tabs
      onChange={onLocationDisplayTypeChange}
      selected={locationDisplayType}
      options={[
        { value: 'Dots', label: LOCATION_DISPLAY_TYPE_DOTS },
        { value: 'Path', label: LOCATION_DISPLAY_TYPE_PATH },
        { value: 'Heatmap', label: LOCATION_DISPLAY_TYPE_HEATMAP },
      ]}
    />
  </div>
);

Options.propTypes = {
  locationDisplayType: PropTypes.oneOf([
    LOCATION_DISPLAY_TYPE_DOTS,
    LOCATION_DISPLAY_TYPE_PATH,
    LOCATION_DISPLAY_TYPE_HEATMAP,
  ]).isRequired,
  onLocationDisplayTypeChange: PropTypes.func.isRequired,
};

export default Options;
