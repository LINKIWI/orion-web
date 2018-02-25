import createMiddleware from 'app/redux/middleware/create-middleware';

describe('Middleware factory', () => {
  test('Maps middleware action types to functions', () => {
    const middlewareMapping = {
      actionType: jest.fn(),
    };

    const store = 'store';
    const next = jest.fn();
    const action = {
      type: 'actionType',
    };
    const middleware = createMiddleware(middlewareMapping);

    middleware(store)(next)(action);

    expect(middlewareMapping.actionType).toBeCalledWith('store', { type: 'actionType' });
    expect(next).toBeCalledWith(action);
  });
});
