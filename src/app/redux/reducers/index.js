import { combineReducers } from 'redux';
import contextReducer from 'app/redux/reducers/context';
import dataSourceReducer from 'app/redux/reducers/data-source';
import filtersReducer from 'app/redux/reducers/filters';
import locationReducer from 'app/redux/reducers/location';
import mapReducer from 'app/redux/reducers/map';
import optionsReducer from 'app/redux/reducers/options';
import progressReducer from 'app/redux/reducers/progress';

const reducer = combineReducers({
  context: contextReducer,
  dataSource: dataSourceReducer,
  filters: filtersReducer,
  location: locationReducer,
  map: mapReducer,
  options: optionsReducer,
  progress: progressReducer,
});

export default reducer;
