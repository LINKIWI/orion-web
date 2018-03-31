import { startProgress, endProgress } from 'app/redux/actions/progress';
import progressReducer from 'app/redux/reducers/progress';

describe('Progress reducer', () => {
  test('Start progress', () => {
    const state = { isLoading: false };
    const action = startProgress();

    const expectState = { isLoading: true };
    const reducedState = progressReducer(state, action);

    expect(reducedState).toEqual(expectState);
  });

  test('End progress', () => {
    const state = { isLoading: true };
    const action = endProgress();

    const expectState = { isLoading: false };
    const reducedState = progressReducer(state, action);

    expect(reducedState).toEqual(expectState);
  });
});
