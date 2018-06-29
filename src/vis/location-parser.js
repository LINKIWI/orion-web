import { LineLayer, ScatterplotLayer, ScreenGridLayer } from 'deck.gl';
import humanize from 'humanize';

/**
 * Decorator for transparently caching the return value of a method. The initial return value is
 * persisted as a class variable on the initial invocation, and the cached value is immediately
 * returned on subsequent invocations. While stateful, this caching mechanism is safe because the
 * rendering path uses immutable state (a new instance of this class is constructed on changed
 * data).
 *
 * @param {string} key Unique cache key for this method.
 * @returns {Function} Wrapped function descriptor that caches the wrapped function's return value.
 */
const cacheable = (key) => (target, name, descriptor) => {
  const method = descriptor.value;

  descriptor.value = function wrappedMethod(...args) {  // eslint-disable-line no-param-reassign
    if (!this._cache) {
      this._cache = {};
    }

    const cachedRet = this._cache[key];
    if (cachedRet) {
      return cachedRet;
    }

    const ret = method.apply(this, args);
    this._cache[key] = ret;
    return ret;
  };

  return descriptor;
};

/**
 * Decorator for aborting a method invocation with a default value if no data is available.
 *
 * @param {*} ret Desired default return value if no data is available.
 * @returns {*} Either the original return value if data is available, or the default return value.
 */
const withDefinedData = (ret = null) => (target, name, descriptor) => {
  const method = descriptor.value;

  descriptor.value = function wrappedMethod(...args) {  // eslint-disable-line no-param-reassign
    return this.data.length ? method.apply(this, args) : ret;
  };

  return descriptor;
};


/**
 * Translation layer to parse location data returned from the API into DeckGL layers for
 * visualization on a map.
 */
export default class LocationParser {
  /**
   * Create a location data layer parser.
   *
   * @param {Array} data Array of location data objects returned from the API.
   * @param {number} accuracyThreshold Maximum tolerable accuracy value for displayed points.
   * @param {Function} onPickHover Callback invoked when a pick target in any data layer is hovered.
   */
  constructor(data = [], accuracyThreshold = Infinity, onPickHover = () => {}) {
    this.data = data;
    this.accuracyThreshold = accuracyThreshold;
    this.onPickHover = onPickHover;
  }

  /**
   * Create an IconLayer (dots) from the input data.
   */
  @withDefinedData()
  getScatterplotLayer() {
    const onHover = ({ x, y, object }) => {
      if (!object) {
        return this.onPickHover();
      }

      const { timestamp, accuracy, position: [lon, lat] } = object;

      return this.onPickHover({
        x,
        y,
        annotations: [
          { heading: 'Timestamp', value: humanize.date('F j, Y, g:i:s A', timestamp) },
          { heading: 'Coordinates', value: `(${lat}, ${lon})` },
          { heading: 'Accuracy', value: `${accuracy} m` },
        ],
      });
    };

    return new ScatterplotLayer({
      id: 'location-scatterplot',
      data: this._getScatterplotLayerData(),
      fp64: true,
      radiusMinPixels: 3.5,
      radiusMaxPixels: 3.5,
      pickable: true,
      autoHighlight: true,
      highlightColor: [255, 255, 255, 255],
      onHover,
    });
  }

  /**
   * Create a ScatterplotLayer (path) from the input data.
   */
  @withDefinedData()
  getLineLayer() {
    const data = this._getLineLayerData();

    if (!data) {
      return null;
    }

    return new LineLayer({
      id: 'location-line',
      data,
      strokeWidth: 3,
      fp64: true,
    });
  }

  /**
   * Create a ScreenGridLayer (heatmap) from the input data.
   */
  @withDefinedData()
  getScreenGridLayer() {
    return new ScreenGridLayer({
      id: 'location-screen-grid',
      data: this._getScreenGridLayerData(),
      minColor: [0, 0, 0, 0],
      maxColor: [90, 189, 250, 245],
      cellSizePixels: 20,
    });
  }

  /**
   * Calculate the minimum timestamp among all data points that are currently eligible.
   *
   * @return {number} The minimum Unix timestamp in the filtered input data.
   * @private
   */
  @cacheable('minTimestamp')
  _getMinTimestamp() {
    return this.data
      .filter(({ accuracy }) => accuracy < this.accuracyThreshold)
      .map(({ timestamp }) => timestamp)
      .reduce((acc, val) => Math.min(acc, val), Infinity);
  }

  /**
   * Calculate the data used as input to the scatterplot layer.
   *
   * @return {Array} Scatterplot layer data array.
   * @private
   */
  @cacheable('dots')
  _getScatterplotLayerData() {
    return this.data
      .filter(({ accuracy }) => accuracy <= this.accuracyThreshold)
      .map(({ timestamp, accuracy, latitude, longitude }) => ({
        position: [longitude, latitude],
        color: [59, 149, 204, 180],
        timestamp,
        accuracy,
      }));
  }

  /**
   * Calculate the data used as input to the line layer.
   *
   * @return {Array|null} Line layer data array, or null if unavailable.
   * @private
   */
  @cacheable('path')
  _getLineLayerData() {
    const eligibleData = this.data
      .sort((a, b) => a.timestamp - b.timestamp)
      .filter(({ accuracy }) => accuracy < this.accuracyThreshold);

    if (!eligibleData.length) {
      return null;
    }

    const firstPosition = {
      sourcePosition: [eligibleData[0].longitude, eligibleData[0].latitude],
      targetPosition: [eligibleData[0].longitude, eligibleData[0].latitude],
    };
    const { timestamp: lastTimestamp } = eligibleData[eligibleData.length - 1];

    return eligibleData
      .reduce((acc, { latitude, longitude, timestamp }) => {
        const lastEntry = acc[acc.length - 1];
        const colorRatio = (timestamp - this._getMinTimestamp()) /
          (lastTimestamp - this._getMinTimestamp());
        const entry = {
          sourcePosition: lastEntry.targetPosition,
          targetPosition: [longitude, latitude],
          // Start of the path is red; end of the path is blue
          color: [255 * (1 - colorRatio), 160 * colorRatio, 255 * colorRatio],
        };
        return [...acc, entry];
      }, [firstPosition]);
  }

  /**
   * Calculate the data used as input to the screen grid layer.
   *
   * @return {Array} Screen grid layer data array.
   * @private
   */
  @cacheable('heatmap')
  _getScreenGridLayerData() {
    return this.data
      .filter(({ accuracy }) => accuracy <= this.accuracyThreshold)
      .map(({ latitude, longitude }) => ({ position: [longitude, latitude] }));
  }
}
