import { START_PROGRESS, END_PROGRESS } from 'app/redux/actions/progress';
import createReducer from 'app/redux/reducers/create-reducer';

const initialState = {
  isLoading: false,
};

const startProgressReducer = (state) => ({
  ...state,
  isLoading: true,
});

const endProgressReducer = (state) => ({
  ...state,
  isLoading: false,
});

const reducerMapping = {
  [START_PROGRESS]: startProgressReducer,
  [END_PROGRESS]: endProgressReducer,
};

export default createReducer(reducerMapping, initialState);
