import { loadLocations } from 'app/redux/actions/location';
import locationReducer from 'app/redux/reducers/location';

describe('Location reducer', () => {
  test('Load valid locations', () => {
    const state = { data: [] };
    const action = loadLocations(['location']);

    const expectState = { data: ['location'] };
    const reducedState = locationReducer(state, action);

    expect(reducedState).toEqual(expectState);
  });

  test('Clear out locations if response is undefined', () => {
    const state = { data: ['location'] };
    const action = loadLocations();

    const expectState = { data: [] };
    const reducedState = locationReducer(state, action);

    expect(reducedState).toEqual(expectState);
  });
});
