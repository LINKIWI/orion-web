import { viewport } from '@mapbox/geo-viewport';

/**
 * Determine the appropriate center coordinate and zoom level for the map, given an array of data.
 *
 * @param {Array} data Array of location objects.
 * @param {number} accuracyThreshold Maximum tolerable accuracy threshold in meters.
 * @param {number} width Current width of the viewport.
 * @param {number} height Current height of the viewport.
 * @returns {Object} An object containing center and zoom properties describing how best to fit the
 *                   map bounds to the data..
 */
export const fitMapBounds = (data, accuracyThreshold, width, height) => {
  const minLongitude = data
    .filter(({ accuracy }) => accuracy < accuracyThreshold)
    .map(({ longitude }) => longitude)
    .reduce((acc, val) => Math.min(acc, val), Infinity);
  const maxLatitude = data
    .filter(({ accuracy }) => accuracy < accuracyThreshold)
    .map(({ latitude }) => latitude)
    .reduce((acc, val) => Math.max(acc, val), -Infinity);
  const maxLongitude = data
    .filter(({ accuracy }) => accuracy < accuracyThreshold)
    .map(({ longitude }) => longitude)
    .reduce((acc, val) => Math.max(acc, val), -Infinity);
  const minLatitude = data
    .filter(({ accuracy }) => accuracy < accuracyThreshold)
    .map(({ latitude }) => latitude)
    .reduce((acc, val) => Math.min(acc, val), Infinity);

  return viewport([minLongitude, minLatitude, maxLongitude, maxLatitude], [width, height]);
};

export default undefined;
