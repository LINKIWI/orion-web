export const FETCH_LOCATIONS = 'FETCH_LOCATIONS';
export const LOAD_LOCATIONS = 'LOAD_LOCATIONS';

/**
 * Trigger a network request to fetch locations for the currently defined data source parameters in
 * the store.
 *
 * @return {Object} Action for fetching locations.
 */
export const fetchLocations = () => ({
  type: FETCH_LOCATIONS,
});

/**
 * Load an array of locations into the store.
 *
 * @param {Array} locations Array of location objects.
 * @return {Object} Action for loading fetched locations.
 */
export const loadLocations = (locations) => ({
  type: LOAD_LOCATIONS,
  payload: { locations },
});
