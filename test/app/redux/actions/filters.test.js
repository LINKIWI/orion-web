import { setAccuracyFilter, SET_ACCURACY_FILTER } from 'app/redux/actions/filters';

describe('Filter actions', () => {
  test('Set accuracy filter', () => {
    expect(setAccuracyFilter(5)).toEqual({
      type: SET_ACCURACY_FILTER,
      payload: { threshold: 5 },
    });
  });
});
