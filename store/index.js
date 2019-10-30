import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import global from './global';
import match from './match';
import join from './matching/join';
import ranking from './matching/ranking';
import user from './user';
import profile from './profile';
import organization from './organization';

const logger = createLogger();

const middleware = [thunk, logger];

export const reducers = combineReducers({
  global, match, ranking, user, join, profile, organization,
});

function initialStore(initialState = {}) {
  return createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));
}

export default initialStore;
