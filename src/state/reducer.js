import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import testReducer from './test/reducer';
import { getTime } from '../utils';

export default combineReducers({
  router: routerReducer,
  test: testReducer(getTime),
});
