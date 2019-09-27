
export const initState = {
  inputSkillVisible: false,
  skill: '',
  inputDocumentVisible: false,
  document: '',
  applicant: {
    skills: [],
    experiences: '',
  },
};

export const SET_INPUT_SKILL_VISIBLE = 'MATCH/SET_INPUT_SKILL_VISIBLE';
export const SET_SKILL = 'MATCH/SET_SKILL';

export const ADD_APPLICANT_SKILL = 'MATCH/ADD_APPLICANT_SKILL';
export const REMOVE_APPLICANT_SKILL = 'MATCH/REMOVE_APPLICANT_SKILL';
export const SET_APPLICANT_EXPERIENCES = 'MATCH/SET_APPLICANT_EXPERIENCES';

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
