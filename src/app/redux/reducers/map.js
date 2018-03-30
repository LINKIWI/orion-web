import { SET_VIEWPORT } from 'app/redux/actions/map';
import createReducer from 'app/redux/reducers/create-reducer';

const initialState = {
  viewport: {
    longitude: 0,
    latitude: 0,
    zoom: 0,
    minZoom: 0,
    maxZoom: 20,
  },
};

const setViewportReducer = (state, action) => ({
  ...state,
  viewport: action.payload.viewport,
});

const reducerMapping = {
  [SET_VIEWPORT]: setViewportReducer,
};

export default createReducer(reducerMapping, initialState);
