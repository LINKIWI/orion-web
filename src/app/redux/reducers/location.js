import { LOAD_LOCATIONS } from 'app/redux/actions/location';
import createReducer from 'app/redux/reducers/create-reducer';

const initialState = {
  data: [],
};

const loadLocationsReducer = (state, action) => ({
  ...state,
  data: action.payload.locations || [],
});

const reducerMapping = {
  [LOAD_LOCATIONS]: loadLocationsReducer,
};

export default createReducer(reducerMapping, initialState);
