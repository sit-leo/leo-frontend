const initState = {
  ranks: [],
};

// Actions
const ADD_RANK = 'leo/match/add/rank';
const UPDATE_RANK = 'leo/match/update/rank';
const REMOVE_RANK = 'leo/match/remove/rank';

// Reducer
export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case ADD_RANK: {
      const ranks = [...state.ranks];
      if (!ranks.find(rank => rank.id === action.rank.id)) {
        ranks.push({ ...action.rank, positionId: action.rank.id, sequence: ranks.length + 1 });
      }
      return { ...state, ranks };
    }
    case UPDATE_RANK: {
      let ranks = [...state.ranks];
      const removalIndex = ranks.findIndex(rank => rank.id === action.rank.id);
      ranks.splice(removalIndex, 1);
      ranks.splice(action.index, 0, { ...action.rank, sequence: action.index + 1 });
      ranks = ranks.map((rank, rankIndex) => ({ ...rank, sequence: rankIndex + 1 }));
      return { ...state, ranks };
    }
    case REMOVE_RANK: {
      let ranks = [...state.ranks].filter(rank => rank.name !== action.rank.name);
      ranks = ranks.map((rank, rankIndex) => ({ ...rank, sequence: rankIndex + 1 }));
      return { ...state, ranks };
    }
    default: return { ...state };
  }
}

// Action Creators

export function addRank(rank) {
  return { type: ADD_RANK, rank };
}

export function updateRank(index, rank) {
  return { type: UPDATE_RANK, index, rank };
}

export function removeRank(rank) {
  return { type: REMOVE_RANK, rank };
}
