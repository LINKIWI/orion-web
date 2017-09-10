import { INCREMENT, increment } from 'app/redux/actions/sample';

describe('Sample actions', () => {
  test('Increment', () => {
    expect(increment().type).toBe(INCREMENT);
  });
});
