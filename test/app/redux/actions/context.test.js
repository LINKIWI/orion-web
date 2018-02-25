import { setWindowDimensions, SET_WINDOW_DIMENSIONS } from 'app/redux/actions/context';

describe('Context actions', () => {
  test('Set window dimensions', () => {
    expect(setWindowDimensions(10, 100)).toEqual({
      type: SET_WINDOW_DIMENSIONS,
      payload: { width: 10, height: 100 },
    });
  });
});
