import reducers from 'app/redux/reducers';

describe('Combined reducers', () => {
  test('Exported function is an application-wide reducer', () => {
    expect(typeof reducers).toBe('function');  // ?
  });
});
