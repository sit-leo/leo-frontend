import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import loading from './theme/loading';
import user from './account/user';

const logger = createLogger();

const middleware = [thunk, logger];

export const reducers = combineReducers({ loading, user });

function initialState() {
  return createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)));
}

export default initialState;
