import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import test from './test/reducer';

export default combineReducers({
  router: routerReducer,
  test,
});
