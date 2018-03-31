import createReducer from 'app/redux/reducers/create-reducer';

describe('Reducer factory', () => {
  test('Maps reducer action types to reducer functions', () => {
    const mockReducer = jest.fn();
    const reducerMapping = { actionType: mockReducer };
    const initialState = { param: 1 };
    const action = { type: 'actionType' };

    const reducer = createReducer(reducerMapping, initialState);

    // Action type unknown to the reducer
    reducer(initialState, { type: 'unknown' });
    expect(mockReducer).not.toBeCalled();

    // Action type known to the reducer
    reducer(initialState, action);
    expect(mockReducer).toBeCalledWith(initialState, action);
  });
});
