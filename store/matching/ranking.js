const initState = {
  haveRank: false,
  isUpdateRank: false,

  position: { id: 0 },

  positions: [{
    id: 0,
    name: 'No Position Found',
    capacity: 0,
  }],

  applicants: [{
    id: 0,
    name: 'No Applicant Found',
    documents: [],
  }],

  applicantRanks: [{
    positionId: 0,
  }],

  recruiterRanks: [{
    applicantMatchId: 0,
  }],
};

// Actions
export const SET_HAVE_RANK = 'RANKING/SET_HAVE_RANK';
export const SET_IS_UPDATE_RANK = 'RANKING/SET_IS_UPDATE_RANK';

export const SET_POSITION = 'RANKING/SET_POSITION';

export const SET_POSITIONS = 'RANKING/SET_POSITIONS';
export const SET_APPLICANTS = 'RANKING/SET_APPLICANTS';

export const SET_APPLICANT_RANKS = 'RANKING/SET_APPLICANT_RANKS';
export const ADD_APPLICANT_RANKS = 'RANKING/ADD_APPLICANT_RANKS';
export const UPDATE_APPLICANT_RANKS = 'RANKING/UPDATE_APPLICANT_RANKS';
export const REMOVE_APPLICANT_RANKS = 'RANKING/REMOVE_APPLICANT_RANKS';

export const SET_RECRUITER_RANKS = 'RANKING/SET_RECRUITER_RANKS';
export const ADD_RECRUITER_RANKS = 'RANKING/ADD_RECRUITER_RANKS';
export const UPDATE_RECRUITER_RANKS = 'RANKING/UPDATE_RECRUITER_RANKS';
export const REMOVE_RECRUITER_RANKS = 'RANKING/REMOVE_RECRUITER_RANKS';

// Utilities
function isRankEqualPosition(rank, position) {
  return rank.positionId === position.positionId;
}

function isRankNotEqualPosition(rank, position) {
  return rank.positionId !== position.positionId;
}

function isRankNotEqualApplicantMatch(rank, applicantMatch) {
  return rank.applicantMatchId !== applicantMatch.applicantMatchId;
}

function setSequenceByRankIndex(rank, rankIndex) {
  return { ...rank, sequence: rankIndex + 1 };
}

function setApplicantMatchIdToRecruiterRank(rank) {
  return { ...rank, applicantMatch: { id: rank.applicantMatchId } };
}

function setPositionIdToApplicantRank(rank) {
  return { ...rank, position: { id: rank.positionId } };
}

function setPositionId(position) {
  return { ...position, positionId: position.id };
}

function setApplicantMatchId(applicantMatch) {
  return { ...applicantMatch, applicantMatchId: applicantMatch.id };
}

// Reducer
export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case SET_HAVE_RANK: return { ...state, haveRank: action.haveRank };

    case SET_IS_UPDATE_RANK: return { ...state, isUpdateRank: action.isUpdateRank };

    case SET_POSITION: return { ...state, position: action.position };

    case SET_POSITIONS: {
      const positions = action.positions.map(setPositionId);
      return { ...state, positions };
    }

    case SET_APPLICANTS: {
      const applicants = action.applicants.map(setApplicantMatchId);
      return { ...state, applicants };
    }

    case SET_APPLICANT_RANKS: {
      const applicantRanks = action.applicantRanks.map(setPositionIdToApplicantRank);
      return { ...state, applicantRanks };
    }

    case ADD_APPLICANT_RANKS: {
      const { position } = action;
      const applicantRanks = [...state.applicantRanks];
      if (!applicantRanks.find(rank => isRankEqualPosition(rank, position))) {
        applicantRanks.push({
          position,
          positionId: position.id,
          sequence: applicantRanks.length + 1,
        });
      }
      return { ...state, applicantRanks };
    }

    case REMOVE_APPLICANT_RANKS: {
      const { position } = action;
      const filteredApplicantRanks = state.applicantRanks.filter(rank => isRankNotEqualPosition(rank, position));
      const applicantRanks = filteredApplicantRanks.map(setSequenceByRankIndex);
      return { ...state, applicantRanks };
    }

    case UPDATE_APPLICANT_RANKS: {
      const { index, position } = action;
      const removalIndex = state.applicantRanks.findIndex(rank => isRankEqualPosition(rank, position));
      const ranks = [...state.applicantRanks];
      ranks.splice(removalIndex, 1);
      ranks.splice(index, 0, { ...position, sequence: index + 1 });
      const applicantRanks = ranks.map((rank, rankIndex) => ({ ...rank, sequence: rankIndex + 1 }));
      return { ...state, applicantRanks };
    }

    case SET_RECRUITER_RANKS: {
      const recruiterRanks = action.recruiterRanks.map(setApplicantMatchIdToRecruiterRank);
      return { ...state, recruiterRanks };
    }

    case ADD_RECRUITER_RANKS: {
      const { applicantMatch } = action;
      const recruiterRanks = [...state.recruiterRanks];
      if (!recruiterRanks.find(rank => rank.applicantMatchId === applicantMatch.id)) {
        recruiterRanks.push({
          applicantMatch,
          applicantMatchId: applicantMatch.id,
          sequence: recruiterRanks.length + 1,
        });
      }
      return { ...state, recruiterRanks };
    }

    case UPDATE_RECRUITER_RANKS: {
      const { index, applicant } = action;
      let ranks = [...state.ranks];
      const removalIndex = ranks.findIndex(rank => rank.applicantMatchId === applicant.applicantMatchId);
      ranks.splice(removalIndex, 1);
      ranks.splice(index, 0, { ...applicant, sequence: index + 1 });
      ranks = ranks.map((rank, rankIndex) => ({ ...rank, sequence: rankIndex + 1 }));
      return { ...state, ranks };
    }

    case REMOVE_RECRUITER_RANKS: {
      const { applicantMatch } = action;
      const filteredRecruiterRanks = state.recruiterRanks.filter(rank => isRankNotEqualApplicantMatch(rank, applicantMatch));
      const recruiterRanks = filteredRecruiterRanks.map(setSequenceByRankIndex);
      return { ...state, recruiterRanks };
    }

    default: return { ...state };
  }
}

// Action Creators
export function setHaveRank(haveRank) {
  return { type: SET_HAVE_RANK, haveRank };
}

export function setIsUpdateRank(isUpdateRank) {
  return { type: SET_IS_UPDATE_RANK, isUpdateRank };
}

export function setPosition(position) {
  return { type: SET_POSITION, position };
}

export function setPositions(positions) {
  return { type: SET_POSITIONS, positions };
}

export function setApplicants(applicants) {
  return { type: SET_APPLICANTS, applicants };
}

export function addApplicantRank(position) {
  return { type: ADD_APPLICANT_RANKS, position };
}

export function removeApplicantRank(position) {
  return { type: REMOVE_APPLICANT_RANKS, position };
}

export function updateApplicantRank(index, position) {
  return { type: UPDATE_APPLICANT_RANKS, index, position };
}

export function addRecruiterRank(applicantMatch) {
  return { type: ADD_RECRUITER_RANKS, applicantMatch };
}

export function updateRecruiterRank(index, applicantMatch) {
  return { type: UPDATE_RECRUITER_RANKS, index, applicantMatch };
}

export function removeRecruiterRank(applicantMatch) {
  return { type: REMOVE_RECRUITER_RANKS, applicantMatch };
}

export function setApplicantRanks(applicantRanks) {
  return { type: SET_APPLICANT_RANKS, applicantRanks };
}

export function setRecruiterRanks(recruiterRanks) {
  return { type: SET_RECRUITER_RANKS, recruiterRanks };
}
