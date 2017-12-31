import { SET_WINDOW_DIMENSIONS } from 'app/redux/actions/context';
import createReducer from 'app/redux/reducers/create-reducer';

const initialState = {
  width: null,
  height: null,
  isCompact: false,
};

const setWindowDimensionsReducer = (state, action) => {
  const { width, height } = action.payload;

  const isCompact = width < 600 || height < 700;

  return {
    ...state,
    width,
    height,
    isCompact,
  };
};

const reducerMapping = {
  [SET_WINDOW_DIMENSIONS]: setWindowDimensionsReducer,
};

export default createReducer(reducerMapping, initialState);
