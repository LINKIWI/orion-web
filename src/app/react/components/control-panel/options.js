import React from 'react';
import PropTypes from 'prop-types';
import { Spacing, Tabs, Text } from 'react-elemental';
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
        Choose how location data is displayed on the map
      </Text>
    </Spacing>

    <Tabs
      onChange={onLocationDisplayTypeChange}
      value={locationDisplayType}
      options={[
        { value: LOCATION_DISPLAY_TYPE_DOTS, label: 'Dots' },
        { value: LOCATION_DISPLAY_TYPE_PATH, label: 'Path' },
        { value: LOCATION_DISPLAY_TYPE_HEATMAP, label: 'Heatmap' },
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
