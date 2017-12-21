import React, { Component } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import match from 'functional-match';
import {
  LOCATION_DISPLAY_TYPE_DOTS,
  LOCATION_DISPLAY_TYPE_PATH,
  LOCATION_DISPLAY_TYPE_HEATMAP,
} from 'app/redux/reducers/options';
import { setViewport } from 'app/redux/actions/map';
import MapRoot from 'app/react/components/map';
import withMotion from 'app/react/hoc/with-motion';
import LocationParser from 'vis/location-parser';

// Parameters passed to react-motion's spring motion style factory.
const MAP_ANIMATION_STYLE = { stiffness: 120, damping: 25 };

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
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
  };

  state = { containerWidth: null, containerHeight: null };

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  componentWillReceiveProps({ data: nextData, accuracyThreshold: nextAccuracyThreshold }) {
    const { data, accuracyThreshold } = this.props;

    if (data !== nextData || accuracyThreshold !== nextAccuracyThreshold) {
      this.locationParser = new LocationParser(nextData, nextAccuracyThreshold);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => this.setState({
    containerWidth: window.innerWidth,
    containerHeight: window.innerHeight,
  });

  locationParser = new LocationParser();

  render() {
    const {
      locationDisplayType,
      viewport,
      handleViewportChange,
      // Motion props
      latitude,
      longitude,
      zoom,
    } = this.props;
    const { containerWidth, containerHeight } = this.state;

    if (!containerWidth || !containerHeight) {
      return null;
    }

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
            width: containerWidth,
            height: containerHeight,
            latitude,
            longitude,
            zoom,
          }}
          onViewportChange={handleViewportChange}
          layersThunk={layersThunk}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ location, filters, options, map }) => ({
  data: location.data,
  accuracyThreshold: filters.accuracyThreshold,
  locationDisplayType: options.locationDisplayType,
  viewport: map.viewport,
});

const mapDispatchToProps = (dispatch) => ({
  handleViewportChange: (viewport) => dispatch(setViewport(viewport)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withMotion(({ viewport: { latitude, longitude, zoom } }) => ({
    animationStyle: MAP_ANIMATION_STYLE,
    animationProperties: { latitude, longitude, zoom },
  })),
)(MapContainer);
