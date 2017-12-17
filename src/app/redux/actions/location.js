export const FETCH_LOCATIONS = 'FETCH_LOCATIONS';
export const LOAD_LOCATIONS = 'LOAD_LOCATIONS';

export const fetchLocations = () => ({
  type: FETCH_LOCATIONS,
});

export const loadLocations = (locations) => ({
  type: LOAD_LOCATIONS,
  payload: { locations },
});
