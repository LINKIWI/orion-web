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
  const { minLongitude, minLatitude, maxLongitude, maxLatitude } = data
    .filter(({ accuracy }) => accuracy < accuracyThreshold)
    .reduce((acc, val) => ({
      minLongitude: Math.min(acc.minLongitude, val.longitude),
      maxLongitude: Math.max(acc.maxLongitude, val.longitude),
      minLatitude: Math.min(acc.minLatitude, val.latitude),
      maxLatitude: Math.max(acc.maxLatitude, val.latitude),
    }), {
      minLongitude: Infinity,
      maxLongitude: -Infinity,
      minLatitude: Infinity,
      maxLatitude: -Infinity,
    });

  return viewport([minLongitude, minLatitude, maxLongitude, maxLatitude], [width, height]);
};

export default undefined;
