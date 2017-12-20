import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spacing } from 'react-elemental';
import DeckGL from 'deck.gl';
import MapGL, { NavigationControl } from 'react-map-gl';

/**
 * Wrapper around MapGL and the DeckGL overlay layer.
 */
export default class MapRoot extends Component {
  static propTypes = {
    viewport: PropTypes.object.isRequired,
    layersThunk: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onViewportChange: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { width, height, viewport, onViewportChange } = this.props;

    // During state initialization, the store has no knowledge of the viewport dimensions since the
    // map had not been rendered yet. Immediately after rendering the map, update the viewport state
    // with the now-known dimensions.
    onViewportChange({ ...viewport, width, height });
  }

  render() {
    const { layersThunk, width, height, viewport, onViewportChange } = this.props;

    return (
      <MapGL
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={process.env.MAPBOX_API_TOKEN}
        onViewportChange={onViewportChange}
        width={width}
        height={height}
        {...viewport}
      >
        <div style={{ bottom: 0, position: 'absolute', right: 0 }}>
          <Spacing right>
            <Spacing size="large" bottom>
              <NavigationControl onViewportChange={onViewportChange} />
            </Spacing>
          </Spacing>
        </div>

        <DeckGL
          // Lazy evaluation - need to ensure that this is updated on re-renders.
          layers={layersThunk()}
          width={width}
          height={height}
          {...viewport}
        />
      </MapGL>
    );
  }
}
