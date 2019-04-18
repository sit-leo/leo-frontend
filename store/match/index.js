export const initState = {
  match: {
    id: 0,
    name: 'No Match Found',
  },
};

// Actions
export const SET_MATCH = 'MATCH/SET_MATCH';

// Reducer
export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case SET_MATCH: {
      const match = action.match || initState.match;
      return { ...state, match };
    }
    default: return { ...state };
  }
}

// Action Creators
export function setMatch(match) {
  return { type: SET_MATCH, match };
}
