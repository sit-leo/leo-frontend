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
  ranks: [],
};

// Actions
const SET_LOADING = 'leo/match/set/loading';

const SET_MATCH = 'leo/match/set/match';
const SET_POSITIONS = 'leo/match/set/positions';
const ADD_RANK = 'leo/match/add/rank';
const REMOVE_RANK = 'leo/match/remove/rank';

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
    case ADD_RANK: {
      const ranks = [...state.ranks];
      if (!ranks.find(rank => rank.name === action.rank.name)) {
        ranks.push({ ...action.rank, positionId: action.rank.id, sequence: ranks.length + 1 });
      }
      return { ...state, ranks };
    }
    case REMOVE_RANK: {
      const ranks = [...state.ranks].filter(rank => rank.name !== action.rank.name);
      return { ...state, ranks };
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

export function addRank(rank) {
  return { type: ADD_RANK, rank };
}

export function removeRank(rank) {
  return { type: REMOVE_RANK, rank };
}
