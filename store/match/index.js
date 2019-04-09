const initState = {
  loading: false,
  match: {
    id: 0,
    name: 'No Match Found',
  },
  positions: [{
    id: 0,
    name: 'No Position Found',
    capacity: 0,
  }],
};

// Actions
const SET_LOADING = 'leo/match/set/loading';

const SET_MATCH = 'leo/match/set/match';
const SET_POSITIONS = 'leo/match/set/positions';

// Reducer
export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case SET_LOADING: return { ...state, loading: action.loading };
    case SET_MATCH: {
      const match = action.match ? action.match : initState.match;
      return { ...state, match };
    }
    case SET_POSITIONS: {
      const positions = (action.positions && action.positions.length > 0) ? action.positions : initState.positions;
      return { ...state, positions };
    }
    default: return { ...state };
  }
}

// Action Creators
export function setMatch(match) {
  return { type: SET_MATCH, match };
}

export function setPositions(positions) {
  return { type: SET_POSITIONS, positions };
}
