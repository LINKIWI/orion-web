import sampleReducer from 'app/redux/reducers/sample';
import { increment } from 'app/redux/actions/sample';

describe('Sample reducer', () => {
  const initialState = {
    num: 2,
  };

  test('Increment', () => {
    const reducedState = sampleReducer(initialState, increment());
    expect(reducedState).toEqual({
      ...initialState,
      num: 3,
    });
  });
});
