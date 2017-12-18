import React, { Component } from 'react';
import PropTypes from 'prop-types';
import deepEqual from 'deep-equal';
import { Spacing } from 'react-elemental';
import DeckGL from 'deck.gl';
import MapGL, { NavigationControl } from 'react-map-gl';

const DEFAULT_VIEWPORT = {
  longitude: 0,
  latitude: 0,
  zoom: 5,
  minZoom: 5,
  maxZoom: 50,
};

/**
 * Wrapper around MapGL and the DeckGL overlay layer.
 */
export default class MapRoot extends Component {
  static propTypes = {
    viewport: PropTypes.object,
    layersThunk: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  };

  static defaultProps = {
    viewport: DEFAULT_VIEWPORT,
  };

  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        ...DEFAULT_VIEWPORT,
        ...props.viewport,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!deepEqual(this.props.viewport, nextProps.viewport)) {
      this.setState((prevState) => ({
        viewport: {
          ...prevState.viewport,
          ...nextProps.viewport,
        },
      }));
    }
  }

  handleViewportChange = (viewport) => this.setState((prevState) => ({
    viewport: {
      ...prevState.viewport,
      ...viewport,
    },
  }));

  render() {
    const { layersThunk, width, height } = this.props;
    const { viewport } = this.state;

    // Lazy evaluation - need to ensure that this is updated on re-renders.
    const layers = layersThunk();

    return (
      <MapGL
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={process.env.MAPBOX_API_TOKEN}
        onViewportChange={this.handleViewportChange}
        width={width}
        height={height}
        {...viewport}
      >
        <div style={{ bottom: 0, position: 'absolute', right: 0 }}>
          <Spacing right>
            <Spacing size="large" bottom>
              <NavigationControl onViewportChange={this.handleViewportChange} />
            </Spacing>
          </Spacing>
        </div>

        <DeckGL
          layers={layers}
          width={width}
          height={height}
          {...viewport}
        />
      </MapGL>
    );
  }
}
