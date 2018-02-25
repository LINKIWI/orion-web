import redux from 'redux';
import store from 'app/redux/store';

jest.mock('redux', () => ({
  compose: jest.fn(),
  createStore: jest.fn(),
  applyMiddleware: jest.fn(),
}));
jest.mock('app/redux/reducers', () => ['reducers']);
jest.mock('app/redux/middleware', () => ['middleware']);

describe('Redux store initialization', () => {
  test('Reducers and middleware are passed to store', () => {
    expect(redux.applyMiddleware).toBeCalledWith('middleware');
    expect(redux.createStore).toBeCalledWith(['reducers'], undefined);
    expect(store).toBeUndefined();
  });
});
