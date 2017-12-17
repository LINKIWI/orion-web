import { SET_LOCATION_DISPLAY_TYPE } from 'app/redux/actions/options';
import createReducer from 'app/redux/reducers/create-reducer';

export const LOCATION_DISPLAY_TYPE_DOTS = 'dots';
export const LOCATION_DISPLAY_TYPE_PATH = 'path';

const initialState = {
  locationDisplayType: LOCATION_DISPLAY_TYPE_DOTS,
};

const setLocationDisplayTypeReducer = (state, action) => ({
  ...state,
  locationDisplayType: action.payload.displayType,
});

const reducerMapping = {
  [SET_LOCATION_DISPLAY_TYPE]: setLocationDisplayTypeReducer,
};

export default createReducer(reducerMapping, initialState);
