import Raven from 'raven-js';
import errorReporter from 'app/redux/middleware/error-reporter';

jest.mock('raven-js', () => ({
  captureBreadcrumb: jest.fn(),
  captureException: jest.fn(),
}));

describe('Error reporting middleware', () => {
  beforeEach(() => {
    Raven.captureBreadcrumb.mockClear();
    Raven.captureException.mockClear();
  });

  test('Breadcrumb captured on successful state reduction', () => {
    const store = {
      getState: () => 'state',
    };
    const next = jest.fn(() => 'result');
    const action = 'action';

    expect(errorReporter(store)(next)(action)).toBe('result');
    expect(next).toBeCalledWith(action);
    expect(Raven.captureBreadcrumb).toBeCalledWith({
      message: expect.any(String),
      category: 'redux',
      data: {
        action,
        store: store.getState(),
      },
    });
  });

  test('Exception captured on state reduction failure', () => {
    const store = {
      getState: () => 'state',
    };
    const next = jest.fn(() => {
      throw new Error();
    });
    const action = 'action';

    expect(() => errorReporter(store)(next)(action)).toThrow();
    expect(next).toBeCalledWith(action);
    expect(Raven.captureException).toBeCalledWith(new Error(), {
      extra: {
        action,
        store: store.getState(),
      },
    });
  });
});
