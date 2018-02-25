import middleware from 'app/redux/middleware';

describe('Middleware listing', () => {
  test('Number of applied middleware', () => {
    expect(middleware.length).toBe(2);
  });
});
