import { setAccuracyFilter } from 'app/redux/actions/filters';
import filtersReducer from 'app/redux/reducers/filters';

describe('Filters reducer', () => {
  test('Set accuracy filter', () => {
    const state = { accuracyThreshold: 1 };
    const action = setAccuracyFilter(5);

    const expectState = { accuracyThreshold: 5 };
    const reducedState = filtersReducer(state, action);

    expect(reducedState).toEqual(expectState);
  });
});
