import {
  startProgress,
  endProgress,
  START_PROGRESS,
  END_PROGRESS,
} from 'app/redux/actions/progress';

describe('Progress actions', () => {
  test('Start progress', () => {
    expect(startProgress()).toEqual({
      type: START_PROGRESS,
    });
  });

  test('End progress', () => {
    expect(endProgress()).toEqual({
      type: END_PROGRESS,
    });
  });
});
