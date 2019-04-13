const initState = {

  isUpdateRank: false,
  positions: [],
  applicants: [],
  ranks: [],
};

  // Actions
const SET_POSITIONS = 'leo/match/recruiter/set/positions';

const SET_APPLICANTS = 'leo/match/recruiter/set/applicants';

const SET_IS_UPDATE_RANK = 'leo/match/recruiter/set/isUpdateRank';
const SET_RANK = 'leo/match/recruiter/set/rank';
const ADD_RANK = 'leo/match/recruiter/add/rank';
const UPDATE_RANK = 'leo/match/recruiter/update/rank';
const REMOVE_RANK = 'leo/match/recruiter/remove/rank';

// Reducer
export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case SET_IS_UPDATE_RANK: return { ...state, isUpdateRank: action.isUpdateRank };
    case SET_POSITIONS: {
      return { ...state, positions: action.positions };
    }
    case SET_APPLICANTS: {
      return { ...state, applicants: action.applicants };
    }
    case SET_RANK: {
      const ranks = [...action.ranks].map(rank => ({ ...rank, positionId: rank.position.id }));
      return { ...state, ranks };
    }
    case ADD_RANK: {
      const { position } = action;
      const ranks = [...state.ranks];
      if (!ranks.find(rank => rank.positionId === position.id)) {
        ranks.push({ position, positionId: position.id, sequence: ranks.length + 1 });
      }
      return { ...state, ranks };
    }
    case UPDATE_RANK: {
      const { index, position } = action;
      let ranks = [...state.ranks];
      const removalIndex = ranks.findIndex(rank => rank.positionId === position.positionId);
      ranks.splice(removalIndex, 1);
      ranks.splice(index, 0, { ...position, sequence: index + 1 });
      ranks = ranks.map((rank, rankIndex) => ({ ...rank, sequence: rankIndex + 1 }));
      return { ...state, ranks };
    }
    case REMOVE_RANK: {
      const { position } = action;
      let ranks = [...state.ranks].filter(rank => rank.positionId !== position.positionId);
      ranks = ranks.map((rank, rankIndex) => ({ ...rank, sequence: rankIndex + 1 }));
      return { ...state, ranks };
    }
    default: return { ...state };
  }
}

// Action Creators

export function setPositions(positions) {
  return { type: SET_POSITIONS, positions };
}

export function setApplicants(applicants) {
  return { type: SET_APPLICANTS, applicants };
}

export function setIsUpdateRank(isUpdateRank) {
  return { type: SET_IS_UPDATE_RANK, isUpdateRank };
}

export function setRanks(ranks) {
  return { type: SET_RANK, ranks };
}

export function addRank(position) {
  return { type: ADD_RANK, position };
}

export function updateRank(index, position) {
  return { type: UPDATE_RANK, index, position };
}

export function removeRank(position) {
  return { type: REMOVE_RANK, position };
}
