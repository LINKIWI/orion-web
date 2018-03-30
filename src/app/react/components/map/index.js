import React from 'react';
import PropTypes from 'prop-types';
import { Spacing } from 'react-elemental';
import DeckGL from 'deck.gl';
import MapGL, { NavigationControl } from 'react-map-gl';
import Annotation from 'app/react/components/map/annotation';
import mapStyle from 'resources/data/map-style.json';

/**
 * Wrapper around MapGL and the DeckGL overlay layer.
 */
const MapRoot = ({ annotation, layersThunk, viewport, onViewportChange }) => (
  <MapGL
    mapStyle={mapStyle}
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

    {annotation && (
      <Annotation
        x={annotation.x}
        y={annotation.y}
        annotations={annotation.annotations}
      />
    )}
  </MapGL>
);

MapRoot.propTypes = {
  annotation: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    annotations: PropTypes.arrayOf(PropTypes.shape({
      heading: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })).isRequired,
  }),
  viewport: PropTypes.object.isRequired,
  layersThunk: PropTypes.func.isRequired,
  onViewportChange: PropTypes.func.isRequired,
};

MapRoot.defaultProps = {
  annotation: null,
};

export default MapRoot;
