import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import persistState from 'redux-localstorage';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { TYPES } from './test/actions';
import reducer from './reducer';

export default ({ history }) => {
  const logger = createLogger({
    predicate: (getState, action) => action.type !== TYPES.TEST_INPUT_CHANGE,
  });

  const middleware = applyMiddleware(
    thunk,
    routerMiddleware(history),
    logger,
  );

  return createStore(
    reducer,
    compose(
      middleware,
      persistState(['history', 'testConfig']),
    ),
  );
};
