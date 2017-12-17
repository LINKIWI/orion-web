import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setLocationDisplayType } from 'app/redux/actions/options';
import {
  LOCATION_DISPLAY_TYPE_DOTS,
  LOCATION_DISPLAY_TYPE_PATH,
  LOCATION_DISPLAY_TYPE_HEATMAP,
} from 'app/redux/reducers/options';
import Options from 'app/react/components/control-panel/options';

/**
 * Container controlling the value of options passed to the control panel.
 */
const OptionsContainer = ({ locationDisplayType, handleLocationDisplayTypeChange }) => (
  <Options
    locationDisplayType={locationDisplayType}
    onLocationDisplayTypeChange={handleLocationDisplayTypeChange}
  />
);

OptionsContainer.propTypes = {
  locationDisplayType: PropTypes.oneOf([
    LOCATION_DISPLAY_TYPE_DOTS,
    LOCATION_DISPLAY_TYPE_PATH,
    LOCATION_DISPLAY_TYPE_HEATMAP,
  ]).isRequired,
  handleLocationDisplayTypeChange: PropTypes.func.isRequired,
};

const mapStateToProps = ({ options }) => ({
  locationDisplayType: options.locationDisplayType,
});

const mapDispatchToProps = (dispatch) => ({
  handleLocationDisplayTypeChange: (displayType) => dispatch(setLocationDisplayType(displayType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionsContainer);
