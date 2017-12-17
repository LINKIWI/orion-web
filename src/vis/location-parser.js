import { LineLayer, ScatterplotLayer, ScreenGridLayer } from 'deck.gl';

/**
 * Translation layer to parse location data returned from the API into DeckGL layers for
 * visualization on a map.
 */
export default class LocationParser {
  constructor(data, accuracyThreshold) {
    this.data = data || [];
    this.accuracyThreshold = accuracyThreshold;

    // Wrap the public methods with the withDefinedData abstraction
    this.getScatterplotLayer = this._withDefinedData(this._getScatterplotLayer);
    this.getLineLayer = this._withDefinedData(this._getLineLayer);
    this.getScreenGridLayer = this._withDefinedData(this._getScreenGridLayer);
  }

  /**
   * Higher-order function wrapper for private layer generator methods. This function ensures that
   * the wrapped function only executes if the parser has been initialized with data, and returns
   * null otherwise. It is the responsibility of the client to handle null values.
   *
   * @param {Function} func Function to wrap.
   * @return {Function} Wrapped version of the function that may return null instead of a layer.
   * @private
   */
  _withDefinedData = (func) => (...args) => {
    if (!this.data.length) {
      return null;
    }

    return func(...args);
  };

  /**
   * Create a ScreenGridLayer (heatmap) from the input data.
   *
   * @private
   */
  _getScreenGridLayer = () => {
    const screenGridData = this.data
      .filter(({ accuracy }) => accuracy <= this.accuracyThreshold)
      .map(({ latitude, longitude }) => ({ position: [longitude, latitude] }));

    return new ScreenGridLayer({
      id: 'location-screen-grid',
      data: screenGridData,
      minColor: [0, 0, 0, 0],
      cellSizePixels: 35,
    });
  };

  /**
   * Create a ScatterplotLayer (dots) from the input data.
   *
   * @private
   */
  _getScatterplotLayer = () => {
    const scatterplotData = this.data
      .filter(({ accuracy }) => accuracy <= this.accuracyThreshold)
      .map(({ latitude, longitude }) => ({
        position: [longitude, latitude],
        radius: 6,
        color: [3, 105, 150],
      }));

    return new ScatterplotLayer({
      id: 'location-scatterplot',
      data: scatterplotData,
    });
  };

  /**
   * Create a LineLayer (path) from the input data.
   *
   * @private
   */
  _getLineLayer = () => {
    const firstPosition = {
      sourcePosition: [this.data[0].longitude, this.data[0].latitude],
      targetPosition: [this.data[0].longitude, this.data[0].latitude],
    };

    const eligibleData = this.data
      .sort((a, b) => a.timestamp - b.timestamp)
      .filter(({ accuracy }) => accuracy < this.accuracyThreshold);

    const lineData = eligibleData
      .reduce((acc, { latitude, longitude }, idx) => {
        const lastEntry = acc[acc.length - 1];
        const colorRatio = idx / eligibleData.length;
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
  };
}
