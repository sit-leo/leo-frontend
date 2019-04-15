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
      const ranks = [...action.ranks].map(rank => ({ ...rank, applicantMatchId: rank.id }));
      return { ...state, ranks };
    }
    case ADD_RANK: {
      const { applicant } = action;
      const ranks = [...state.ranks];
      if (!ranks.find(rank => rank.applicantMatchId === applicant.id)) {
        ranks.push({ applicant, applicantMatchId: applicant.id, sequence: ranks.length + 1 });
      }
      return { ...state, ranks };
    }
    case UPDATE_RANK: {
      const { index, applicant } = action;
      let ranks = [...state.ranks];
      const removalIndex = ranks.findIndex(rank => rank.applicantMatchId === applicant.applicantMatchId);
      ranks.splice(removalIndex, 1);
      ranks.splice(index, 0, { ...applicant, sequence: index + 1 });
      ranks = ranks.map((rank, rankIndex) => ({ ...rank, sequence: rankIndex + 1 }));
      return { ...state, ranks };
    }
    case REMOVE_RANK: {
      const { applicant } = action;
      let ranks = [...state.ranks].filter(rank => rank.applicantMatchId !== applicant.applicantMatchId);
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

export function addRank(applicant) {
  return { type: ADD_RANK, applicant };
}

export function updateRank(index, applicant) {
  return { type: UPDATE_RANK, index, applicant };
}

export function removeRank(applicant) {
  return { type: REMOVE_RANK, applicant };
}
