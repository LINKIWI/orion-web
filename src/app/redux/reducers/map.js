import { SET_VIEWPORT, SET_ANIMATION } from 'app/redux/actions/map';
import createReducer from 'app/redux/reducers/create-reducer';

const initialState = {
  viewport: {
    longitude: 0,
    latitude: 0,
    zoom: 0,
    minZoom: 0,
    maxZoom: 20,
  },
  animation: false,
};

const setViewportReducer = (state, action) => ({
  ...state,
  viewport: action.payload.viewport,
});

const setAnimationReducer = (state, action) => ({
  ...state,
  animation: action.payload.isEnabled,
});

const reducerMapping = {
  [SET_VIEWPORT]: setViewportReducer,
  [SET_ANIMATION]: setAnimationReducer,
};

export default createReducer(reducerMapping, initialState);
