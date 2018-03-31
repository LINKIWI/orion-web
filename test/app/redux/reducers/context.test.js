import { setWindowDimensions } from 'app/redux/actions/context';
import contextReducer from 'app/redux/reducers/context';

describe('Context reducer', () => {
  test('Set window dimensions', () => {
    const state = { width: 10, height: 10, isCompact: true };
    const action = setWindowDimensions(1000, 1000);

    const expectState = { width: 1000, height: 1000, isCompact: false };
    const reducedState = contextReducer(state, action);

    expect(reducedState).toEqual(expectState);
  });
});
