import { combineReducers } from 'redux';
import dataSourceReducer from 'app/redux/reducers/data-source';
import filtersReducer from 'app/redux/reducers/filters';
import locationReducer from 'app/redux/reducers/location';
import optionsReducer from 'app/redux/reducers/options';
import progressReducer from 'app/redux/reducers/progress';

const reducer = combineReducers({
  dataSource: dataSourceReducer,
  filters: filtersReducer,
  location: locationReducer,
  options: optionsReducer,
  progress: progressReducer,
});

export default reducer;
