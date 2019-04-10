import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import user from './account/user';
import match from './match';
import applicant from './match/applicant';
import recruiter from './match/recruiter';

const logger = createLogger();

const middleware = [thunk, logger];

export const reducers = combineReducers({
  match, applicant, recruiter, user,
});

function initialStore(initialState = {}) {
  return createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));
}

export default initialStore;
