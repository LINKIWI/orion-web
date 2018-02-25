import {
  fetchLocations,
  loadLocations,
  FETCH_LOCATIONS,
  LOAD_LOCATIONS,
} from 'app/redux/actions/location';

describe('Location actions', () => {
  test('Fetch locations', () => {
    expect(fetchLocations()).toEqual({
      type: FETCH_LOCATIONS,
    });
  });

  test('Load locations', () => {
    expect(loadLocations([])).toEqual({
      type: LOAD_LOCATIONS,
      payload: { locations: [] },
    });
  });
});
