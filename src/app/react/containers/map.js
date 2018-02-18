import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { easeCubic } from 'd3-ease';
import { FlyToInterpolator } from 'react-map-gl';
import match from 'functional-match';
import {
  LOCATION_DISPLAY_TYPE_DOTS,
  LOCATION_DISPLAY_TYPE_PATH,
  LOCATION_DISPLAY_TYPE_HEATMAP,
} from 'app/redux/reducers/options';
import { setViewport } from 'app/redux/actions/map';
import MapRoot from 'app/react/components/map';
import LocationParser from 'vis/location-parser';

/**
 * Wrapper over the primary map component to abstract out logic of translating the location data
 * into visualization layers.
 */
class MapContainer extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    accuracyThreshold: PropTypes.number.isRequired,
    locationDisplayType: PropTypes.oneOf([
      LOCATION_DISPLAY_TYPE_DOTS,
      LOCATION_DISPLAY_TYPE_PATH,
      LOCATION_DISPLAY_TYPE_HEATMAP,
    ]).isRequired,
    viewport: PropTypes.object.isRequired,
    handleViewportChange: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  };

  componentWillReceiveProps({ data: nextData, accuracyThreshold: nextAccuracyThreshold }) {
    const { data, accuracyThreshold } = this.props;

    if (data !== nextData || accuracyThreshold !== nextAccuracyThreshold) {
      this.locationParser = new LocationParser(nextData, nextAccuracyThreshold);
    }
  }

  locationParser = new LocationParser();

  render() {
    const {
      locationDisplayType,
      viewport,
      handleViewportChange,
      // Window dimensions props
      width,
      height,
    } = this.props;

    // Changes in viewport may require re-rendering the map layers. Evaluating this here would cause
    // the layer to remain static despite changes in viewport. Instead, we'll delay evaluation by
    // passing through a thunk that is evaluated on every render within the map root.
    const layersThunk = () => [
      match(locationDisplayType, [
        [LOCATION_DISPLAY_TYPE_DOTS, () => this.locationParser.getIconLayer()],
        [LOCATION_DISPLAY_TYPE_PATH, () => this.locationParser.getLineLayer()],
        [LOCATION_DISPLAY_TYPE_HEATMAP, () => this.locationParser.getScreenGridLayer()],
      ])(),
    ].filter(Boolean);

    return (
      <div style={{ position: 'absolute' }}>
        <MapRoot
          viewport={{
            ...viewport,
            width,
            height,
            transitionInterpolator: new FlyToInterpolator(),
            transitionEasing: easeCubic,
          }}
          onViewportChange={handleViewportChange}
          layersThunk={layersThunk}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ context, location, filters, options, map }) => ({
  width: context.width,
  height: context.height,
  data: location.data,
  accuracyThreshold: filters.accuracyThreshold,
  locationDisplayType: options.locationDisplayType,
  viewport: map.viewport,
});

const mapDispatchToProps = (dispatch) => ({
  handleViewportChange: (viewport) => dispatch(setViewport(viewport)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
