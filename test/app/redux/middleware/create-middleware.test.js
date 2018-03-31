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

    // Unknown action
    middleware(store)(next)({ type: 'unknown' });
    expect(middlewareMapping.actionType).not.toBeCalled();

    // Known action
    middleware(store)(next)(action);
    expect(middlewareMapping.actionType).toBeCalledWith('store', { type: 'actionType' });
    expect(next).toBeCalledWith(action);
  });
});
