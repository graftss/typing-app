import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import historyReducer from './history/reducer';
import testReducer from './test/reducer';
import testConfigReducer from './testConfig/reducer';
import { getTime } from '../utils';

export default combineReducers({
  history: historyReducer,
  router: routerReducer,
  test: testReducer(getTime),
  testConfig: testConfigReducer,
});
