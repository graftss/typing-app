import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducer';

export default ({ history }) => (
  createStore(
    reducer,
    applyMiddleware(
      thunk,
      routerMiddleware(history),
      logger,
    )
  )
);
