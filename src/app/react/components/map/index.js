import React from 'react';
import PropTypes from 'prop-types';
import { Spacing } from 'react-elemental';
import DeckGL from 'deck.gl';
import MapGL, { NavigationControl } from 'react-map-gl';

/**
 * Wrapper around MapGL and the DeckGL overlay layer.
 */
const MapRoot = ({ layersThunk, viewport, onViewportChange }) => (
  <MapGL
    mapStyle="mapbox://styles/mapbox/dark-v9"
    mapboxApiAccessToken={process.env.MAPBOX_API_TOKEN}
    onViewportChange={onViewportChange}
    {...viewport}
  >
    <div style={{ bottom: 0, position: 'absolute', right: 0, zIndex: 2 }}>
      <Spacing right>
        <Spacing size="large" bottom>
          <NavigationControl onViewportChange={onViewportChange} />
        </Spacing>
      </Spacing>
    </div>

    <DeckGL
      // Lazy evaluation - need to ensure that this is updated on re-renders.
      layers={layersThunk()}
      {...viewport}
    />
  </MapGL>
);

MapRoot.propTypes = {
  viewport: PropTypes.object.isRequired,
  layersThunk: PropTypes.func.isRequired,
  onViewportChange: PropTypes.func.isRequired,
};

export default MapRoot;
