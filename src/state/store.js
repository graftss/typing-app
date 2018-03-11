import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { TYPES } from './test/actions';
import reducer from './reducer';

export default ({ history }) => {
  const logger = createLogger({
    predicate: (getState, action) => action.type !== TYPES.TEST_INPUT_CHANGE,
  });

  return createStore(
    reducer,
    applyMiddleware(
      thunk,
      routerMiddleware(history),
      logger,
    )
  );
};
