const initState = {
  ranks: [],
};

// Actions
const ADD_RANK = 'leo/match/add/rank';
const REMOVE_RANK = 'leo/match/remove/rank';

// Reducer
export default function reducer(state = initState, action = {}) {
  switch (action.type) {
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

export function addRank(rank) {
  return { type: ADD_RANK, rank };
}

export function removeRank(rank) {
  return { type: REMOVE_RANK, rank };
}
