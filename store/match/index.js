export const initState = {
  match: {
    id: 0,
    name: '',
    description: '',
    startJoiningDate: null,
    endJoiningDate: null,
    applicantRankingEndDate: null,
    recruiterRankingEndDate: null,
    announceDate: null,
  },
  matches: [{
    id: 0,
    name: 'No Match Found',
  }],
};

// Actions
export const SET_MATCH = 'MATCH/SET_MATCH';
export const SET_MATCH_VALUE_WITH_ATTRIBUTE = 'MATCH/SET_MATCH_VALUE_WITH_ATTRIBUTE';

export const SET_MATCHES = 'MATCH/SET_MATCHES';

// Reducer
export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case SET_MATCH: {
      const match = action.match || initState.match;
      return { ...state, match };
    }
    case SET_MATCHES: {
      const matches = action.matches || initState.matches;
      return { ...state, matches };
    }
    case SET_MATCH_VALUE_WITH_ATTRIBUTE: {
      const { payload: { field, value } } = action;
      const match = { ...state.match, [field]: value };
      return { ...state, match };
    }
    default: return { ...state };
  }
}

// Action Creators
export function setMatch(match) {
  return { type: SET_MATCH, match };
}

export function setMatches(matches) {
  return { type: SET_MATCHES, matches };
}

export function setMatchValueByAttribute(field, value) {
  return { type: SET_MATCH_VALUE_WITH_ATTRIBUTE, payload: { field, value } };
}
