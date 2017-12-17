import { SET_ACCURACY_FILTER } from 'app/redux/actions/filters';
import createReducer from 'app/redux/reducers/create-reducer';

const initialState = {
  accuracyThreshold: Infinity,
};

const setAccuracyFilterReducer = (state, action) => ({
  ...state,
  accuracyThreshold: action.payload.threshold,
});

const reducerMapping = {
  [SET_ACCURACY_FILTER]: setAccuracyFilterReducer,
};

export default createReducer(reducerMapping, initialState);
