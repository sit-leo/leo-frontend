import { message } from 'antd';

export const initState = {
  haveRank: false,
  isUpdateRank: false,
  isConfirm: false,
  isFinished: false,

  position: { id: 0 },

  positions: [
    // {
    //   id: 0,
    //   name: 'No Position Found',
    //   capacity: 0,
    //   money: 0,
    //   files: [{
    //      id: 0,
    //      fileName: '',
    //      applicantProfile: {}
    //   }],
    //   location: 'No Location',
    // },
  ],

  applicants: [
    //   {
    //   id: 0,
    //   name: 'No Applicant Found',
    //   applicant: {
    //     name: 'No Applicant Found',
    //     educations: [{
    //       educationName: 'No Education',
    //       gpax: 0.00,
    //     }],
    //   },
    //   documents: [],
    // }
  ],

  applicantRanks: [],

  recruiterRanks: [],

  matchResults: [],
};

// Actions
export const SET_HAVE_RANK = 'RANKING/SET_HAVE_RANK';
export const SET_IS_UPDATE_RANK = 'RANKING/SET_IS_UPDATE_RANK';
export const SET_IS_CONFIRM = 'RANKING/SET_IS_CONFIRM';

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

export const SET_MATCH_RESULTS = 'RANKING/SET_MATCH_RESULTS';

export const REMOVE_POSITION_FILE = 'RANKING/REMOVE_POSITION_FILE';
export const SET_FINISHED = 'RANKING/SET_FINISHED';

// Utilities
function isRankEqualPosition(rank, position) {
  return rank.positionId === position.positionId;
}

function isRankNotEqualPosition(rank, position) {
  return rank.positionId !== position.positionId;
}

function isRankEqualApplicant(rank, applicant) {
  return rank.participantId === applicant.participantId;
}

function isRankNotEqualApplicantMatch(rank, applicantMatch) {
  return rank.participantId !== applicantMatch.participantId;
}

function setSequenceByRankIndex(rank, rankIndex) {
  return { ...rank, sequence: rankIndex + 1 };
}

function setAttributeForApplicantRank(rank) {
  const newRank = rank;
  delete newRank.applicantMatch.applicant;
  return { ...newRank, positionId: rank.position.id };
}

function setAttributeForRecruiterRank(rank) {
  const newRank = rank;
  delete newRank.position;
  return { ...newRank, participantId: newRank.applicantMatch.participantId };
}

function setPositionId(position) {
  return { ...position, positionId: position.id };
}

function setParticipantId(applicantMatch) {
  return { ...applicantMatch, participantId: applicantMatch.participantId };
}

// Reducer
export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case SET_HAVE_RANK: return { ...state, haveRank: action.haveRank };

    case SET_IS_UPDATE_RANK: return { ...state, isUpdateRank: action.isUpdateRank, isConfirm: false };

    case SET_IS_CONFIRM: return { ...state, isUpdateRank: false, isConfirm: action.isConfirm };

    case SET_POSITION: return { ...state, position: action.position };

    case SET_POSITIONS: {
      const positions = action.positions.map(setPositionId);
      return { ...state, positions };
    }

    case SET_APPLICANTS: {
      const applicants = action.applicants.map(setParticipantId);
      return { ...state, applicants };
    }

    case SET_APPLICANT_RANKS: {
      const applicantRanks = action.applicantRanks.map(setAttributeForApplicantRank);
      return { ...state, applicantRanks };
    }

    case SET_MATCH_RESULTS: {
      const matchResults = action.matchResults || initState.matchResults;
      return { ...state, matchResults };
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
      message.success('Your is rank added.');
      return { ...state, applicantRanks };
    }

    case REMOVE_APPLICANT_RANKS: {
      const { position } = action;
      const filteredApplicantRanks = state.applicantRanks.filter(
        rank => isRankNotEqualPosition(rank, position),
      );
      const applicantRanks = filteredApplicantRanks.map(setSequenceByRankIndex);
      return { ...state, applicantRanks };
    }

    case UPDATE_APPLICANT_RANKS: {
      const { index, position } = action;
      const removalIndex = state.applicantRanks.findIndex(
        rank => isRankEqualPosition(rank, position),
      );
      const ranks = [...state.applicantRanks];
      message.success(`
        Your is rank updated from
        "${ranks[index].position.name}" to "${ranks[removalIndex].position.name}".
      `);

      ranks.splice(removalIndex, 1);
      ranks.splice(index, 0, { ...position, sequence: index + 1 });
      const applicantRanks = ranks.map(setSequenceByRankIndex);

      return { ...state, applicantRanks };
    }

    case SET_RECRUITER_RANKS: {
      const recruiterRanks = action.recruiterRanks.map(setAttributeForRecruiterRank);
      return { ...state, recruiterRanks };
    }

    case ADD_RECRUITER_RANKS: {
      const { applicantMatch } = action;
      const recruiterRanks = [...state.recruiterRanks];
      if (!recruiterRanks.find(rank => rank.participantId === applicantMatch.id)) {
        recruiterRanks.push({
          applicantMatch,
          participantId: applicantMatch.participantId,
          sequence: recruiterRanks.length + 1,
        });
      }
      message.success('Your is rank added.');
      return { ...state, recruiterRanks };
    }

    case UPDATE_RECRUITER_RANKS: {
      const { index, applicantMatch } = action;
      const removalIndex = state.recruiterRanks.findIndex(
        rank => isRankEqualApplicant(rank, applicantMatch),
      );
      const ranks = [...state.recruiterRanks];
      message.success(`
        Your is rank updated from
        "${ranks[index].applicantMatch.applicant.name}" to "${ranks[removalIndex].applicantMatch.applicant.name}"".
      `);

      ranks.splice(removalIndex, 1);
      ranks.splice(index, 0, { ...applicantMatch, sequence: index + 1 });
      const recruiterRanks = ranks.map(setSequenceByRankIndex);

      return { ...state, recruiterRanks };
    }

    case REMOVE_RECRUITER_RANKS: {
      const { applicantMatch } = action;
      const filteredRecruiterRanks = state.recruiterRanks.filter(
        rank => isRankNotEqualApplicantMatch(rank, applicantMatch),
      );
      const recruiterRanks = filteredRecruiterRanks.map(setSequenceByRankIndex);
      return { ...state, recruiterRanks };
    }

    case REMOVE_POSITION_FILE: {
      const { payload: { positionId, fileId } } = action;
      const index = state.applicantRanks.findIndex(position => position.positionId === positionId);
      const applicantRank = state.applicantRanks[index];
      const files = applicantRank.files.filter(file => file.id !== fileId);
      const applicantRanks = [...state.applicantRanks];
      applicantRanks.splice(index, 1, { ...applicantRank, files });
      return { ...state, applicantRanks };
    }

    case SET_FINISHED: {
      const { isFinished } = action;
      return { ...state, isFinished };
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

export function setIsConfirm(isConfirm) {
  return { type: SET_IS_CONFIRM, isConfirm };
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

export function setMatchResults(matchResults) {
  return { type: SET_MATCH_RESULTS, matchResults };
}

export function removePositionFile(positionId, fileId) {
  return { type: REMOVE_POSITION_FILE, payload: { positionId, fileId } };
}

export function setFinished(isFinished) {
  return { type: SET_FINISHED, isFinished };
}
