export const initPosition = {
  name: '',
  salary: '',
  capacity: 1,
  description: '',
  documents: ['Resume', 'Transcript'],
};

export const initState = {
  isOpenJoinModal: false,
  inputSkillVisible: false,
  skill: '',
  inputDocumentVisible: false,
  document: '',
  applicant: {
    skills: [],
    experiences: '',
  },
  recruiter: {
    positions: [initPosition],
  },
};


export const SET_INPUT_SKILL_VISIBLE = 'MATCH/SET_INPUT_SKILL_VISIBLE';
export const SET_SKILL = 'MATCH/SET_SKILL';
export const TOGGLE_JOIN_MODAL = 'MATCH/TOGGLE_JOIN_MODAL';
export const SET_INPUT_DOCUMENT_VISIBLE = 'MATCH/SET_INPUT_DOCUMENT_VISIBLE';
export const SET_DOCUMENT = 'MATCH/SET_DOCUMENT';

export const ADD_APPLICANT_SKILL = 'MATCH/ADD_APPLICANT_SKILL';
export const REMOVE_APPLICANT_SKILL = 'MATCH/REMOVE_APPLICANT_SKILL';
export const SET_APPLICANT_EXPERIENCES = 'MATCH/SET_APPLICANT_EXPERIENCES';

export const ADD_RECRUITER_POSITION = 'MATCH/ADD_RECRUITER_POSITION';
export const UPDATE_RECRUITER_POSITION = 'MATCH/UPDATE_RECRUITER_POSITION';
export const ADD_RECRUITER_DOCUMENT = 'MATCH/ADD_RECRUITER_DOCUMENT';
export const REMOVE_RECRUITER_DOCUMENT = 'MATCH/REMOVE_RECRUITER_DOCUMENT';

export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case SET_APPLICANT_EXPERIENCES: {
      const experiences = action.experiences || initState.applicant.experiences;
      const applicant = { ...state.applicant, experiences };
      return { ...state, applicant };
    }
    case ADD_APPLICANT_SKILL: {
      const { skill } = action;
      const { applicant: { skills } } = state;
      if (skill && skills.indexOf(skill) === -1) {
        const applicant = { ...state.applicant, skills: [...skills, skill] };
        return { ...state, applicant };
      }
      return { ...state };
    }
    case REMOVE_APPLICANT_SKILL: {
      const skills = state.applicant.skills.filter(skill => skill !== action.skill);
      const applicant = { ...state.applicant, skills };
      return { ...state, applicant };
    }
    case SET_INPUT_SKILL_VISIBLE: {
      return { ...state, inputSkillVisible: action.inputSkillVisible };
    }
    case SET_SKILL: {
      return { ...state, skill: action.skill };
    }
    case TOGGLE_JOIN_MODAL: {
      return { ...state, isOpenJoinModal: action.isOpenJoinModal };
    }
    case ADD_RECRUITER_POSITION: {
      const positions = [...state.recruiter.positions, initPosition];
      return { ...state, recruiter: { ...state.recruiter, positions } };
    }
    case UPDATE_RECRUITER_POSITION: {
      const { payload: { index, value, attribute } } = action;
      const position = {
        ...state.recruiter.positions[index],
        [attribute]: value,
      };
      const positions = [...state.recruiter.positions];
      positions.splice(index, 1, position);
      return { ...state, recruiter: { ...state.recruiter, positions } };
    }
    case SET_INPUT_DOCUMENT_VISIBLE: {
      return { ...state, inputDocumentVisible: action.inputDocumentVisible };
    }
    case SET_DOCUMENT: {
      return { ...state, document: action.document };
    }
    case ADD_RECRUITER_DOCUMENT: {
      const { payload: { dataKey, document } } = action;
      const { documents } = state.recruiter.positions[dataKey];
      if (document && documents.indexOf(document) === -1) {
        const position = { ...state.recruiter.positions[dataKey], documents: [...documents, document] };
        const positions = [...state.recruiter.positions];
        positions.splice(dataKey, 1, position);
        return { ...state, recruiter: { ...state.recruiter, positions } };
      }
      return { ...state };
    }
    case REMOVE_RECRUITER_DOCUMENT: {
      const { payload: { dataKey } } = action;
      const documents = state.recruiter.positions[dataKey].documents.filter(document => document !== action.payload.document);
      const position = { ...state.recruiter.positions[dataKey], documents };
      const positions = [...state.recruiter.positions];
      positions.splice(dataKey, 1, position);
      return { ...state, recruiter: { ...state.recruiter, positions } };
    }
    default: return { ...state };
  }
}

export function setExperiences(experiences) {
  return { type: SET_APPLICANT_EXPERIENCES, experiences };
}

export function addApplicantSkill(skill) {
  return { type: ADD_APPLICANT_SKILL, skill };
}

export function removeApplicantSkill(skill) {
  return { type: REMOVE_APPLICANT_SKILL, skill };
}

export function setInputSkillVisible(inputSkillVisible) {
  return { type: SET_INPUT_SKILL_VISIBLE, inputSkillVisible };
}

export function setSkill(skill) {
  return { type: SET_SKILL, skill };
}

export function toggleJoinModal(isOpenJoinModal) {
  return { type: TOGGLE_JOIN_MODAL, isOpenJoinModal };
}

export function addRecruiterPosition() {
  return { type: ADD_RECRUITER_POSITION };
}

export function updateRecruiterPosition(index, attribute, value) {
  return { type: UPDATE_RECRUITER_POSITION, payload: { index, attribute, value } };
}

export function setInputDocumentVisible(inputDocumentVisible) {
  return { type: SET_INPUT_DOCUMENT_VISIBLE, inputDocumentVisible };
}

export function setDocument(document) {
  return { type: SET_DOCUMENT, document };
}

export function addRecruiterDocument(dataKey, document) {
  return { type: ADD_RECRUITER_DOCUMENT, payload: { dataKey, document } };
}

export function removeRecruiterDocument(dataKey, document) {
  return { type: REMOVE_RECRUITER_DOCUMENT, payload: { dataKey, document } };
}
