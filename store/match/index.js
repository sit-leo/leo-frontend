export const initState = {
  match: {
    id: 0,
    name: 'No Match Found',
  },
  matches: [{
    id: 0,
    name: 'No Match Found',
  }],
};

// Actions
export const SET_MATCH = 'MATCH/SET_MATCH';

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
