import { LineLayer, ScatterplotLayer, ScreenGridLayer } from 'deck.gl';

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
   */
  constructor(data, accuracyThreshold) {
    this.data = data || [];
    this.accuracyThreshold = accuracyThreshold;
  }

  /**
   * Create a ScatterplotLayer (dots) from the input data.
   */
  @withDefinedData()
  @cacheable('dots')
  getScatterplotLayer() {
    const scatterplotData = this.data
      .filter(({ accuracy }) => accuracy <= this.accuracyThreshold)
      .map(({ latitude, longitude }) => ({
        position: [longitude, latitude],
        radius: 8,
        color: [3, 105, 150],
      }));

    return new ScatterplotLayer({
      id: 'location-scatterplot',
      data: scatterplotData,
    });
  }

  /**
   * Create a LineLayer (path) from the input data.
   */
  @withDefinedData()
  @cacheable('path')
  getLineLayer() {
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

    const lineData = eligibleData
      .reduce((acc, { latitude, longitude, timestamp }) => {
        const lastEntry = acc[acc.length - 1];
        const colorRatio = (timestamp - this._getMinTimestamp()) /
          (lastTimestamp - this._getMinTimestamp());
        const entry = {
          sourcePosition: lastEntry.targetPosition,
          targetPosition: [longitude, latitude],
          // Start of the path is red; end of the path is blue
          color: [255 * (1 - colorRatio), 128 * colorRatio, 255 * colorRatio],
        };
        return [...acc, entry];
      }, [firstPosition]);

    return new LineLayer({
      id: 'location-line',
      data: lineData,
      strokeWidth: 2,
    });
  }

  /**
   * Create a ScreenGridLayer (heatmap) from the input data.
   */
  @withDefinedData()
  @cacheable('heatmap')
  getScreenGridLayer() {
    const screenGridData = this.data
      .filter(({ accuracy }) => accuracy <= this.accuracyThreshold)
      .map(({ latitude, longitude }) => ({ position: [longitude, latitude] }));

    return new ScreenGridLayer({
      id: 'location-screen-grid',
      data: screenGridData,
      minColor: [0, 0, 0, 0],
      cellSizePixels: 35,
    });
  }

  /**
   * Calculate the average coordinate in the current location data.
   *
   * @return {Object} Object containing properties latitude and longitude describing the average
   *                  coordinate in the input data.
   */
  @withDefinedData({})
  getAverageCoordinate() {
    const avgLat = this.data.map(({ latitude }) => latitude).reduce((a, b) => a + b, 0);
    const avgLon = this.data.map(({ longitude }) => longitude).reduce((a, b) => a + b, 0);

    return { latitude: avgLat / this.data.length, longitude: avgLon / this.data.length };
  }

  /**
   * Calculate the minimum timestamp among all data points that are currently eliglble.
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
}
