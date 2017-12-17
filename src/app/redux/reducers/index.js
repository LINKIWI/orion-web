import { combineReducers } from 'redux';
import dataSourceReducer from 'app/redux/reducers/data-source';
import filtersReducer from 'app/redux/reducers/filters';
import optionsReducer from 'app/redux/reducers/options';

const reducer = combineReducers({
  dataSource: dataSourceReducer,
  filters: filtersReducer,
  options: optionsReducer,
});

export default reducer;
