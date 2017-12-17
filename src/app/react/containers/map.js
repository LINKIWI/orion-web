import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import match from 'functional-match';
import {
  LOCATION_DISPLAY_TYPE_DOTS,
  LOCATION_DISPLAY_TYPE_PATH,
  LOCATION_DISPLAY_TYPE_HEATMAP,
} from 'app/redux/reducers/options';
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
  };

  state = { containerWidth: null, containerHeight: null };

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => this.setState({
    containerWidth: window.innerWidth,
    containerHeight: window.innerHeight,
  });

  render() {
    const { data, accuracyThreshold, locationDisplayType } = this.props;
    const { containerWidth, containerHeight } = this.state;

    if (!containerWidth || !containerHeight) {
      return null;
    }

    const locationParser = new LocationParser(data, accuracyThreshold);

    // Changes in viewport may require re-rendering the map layers. Evaluating this here would cause
    // the layer to remain static despite changes in viewport. Instead, we'll delay evaluation by
    // passing through a thunk that is evaluated on every render within the map root.
    const layersThunk = () => [
      match(locationDisplayType, [
        [LOCATION_DISPLAY_TYPE_DOTS, locationParser.getScatterplotLayer()],
        [LOCATION_DISPLAY_TYPE_PATH, locationParser.getLineLayer()],
        [LOCATION_DISPLAY_TYPE_HEATMAP, locationParser.getScreenGridLayer()],
      ]),
    ].filter(Boolean);

    return (
      <div style={{ position: 'absolute' }}>
        <MapRoot
          width={containerWidth}
          height={containerHeight}
          layersThunk={layersThunk}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ location, filters, options }) => ({
  data: location.data,
  accuracyThreshold: filters.accuracyThreshold,
  locationDisplayType: options.locationDisplayType,
});

export default connect(mapStateToProps)(MapContainer);
