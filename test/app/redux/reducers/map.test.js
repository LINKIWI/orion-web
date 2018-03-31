import { setViewport } from 'app/redux/actions/map';
import mapReducer from 'app/redux/reducers/map';

describe('Map reducer', () => {
  test('Set viewport', () => {
    const state = {
      viewport: {
        lat: 1.0,
        lon: 5.0,
        bearing: 10.1,
        pitch: 50.5,
      },
    };
    const action = setViewport({
      lat: 2.0,
      lon: 6.0,
      pitch: 40.1,
    });

    const expectState = {
      viewport: {
        lat: 2.0,
        lon: 6.0,
        pitch: 40.1,
      },
    };
    const reducedState = mapReducer(state, action);

    expect(reducedState).toEqual(expectState);
  });
});
