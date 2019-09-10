export const initState = {
  inputSkillVisible: false,
  skill: '',
  applicant: {
    skills: [],
    experiences: '',
  },
};


export const SET_INPUT_SKILL_VISIBLE = 'MATCH/SET_INPUT_SKILL_VISIBLE';
export const SET_SKILL = 'MATCH/SET_SKILL';

export const ADD_APPLICANT_SKILL = 'MATCH/ADD_APPLICANT_SKILL';
export const SET_APPLICANT_EXPERIENCES = 'MATCH/SET_APPLICANT_EXPERIENCES';

export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case SET_APPLICANT_EXPERIENCES: {
      const experiences = action.experiences || initState.applicant.experiences;
      const applicant = { ...state.applicant, experiences };
      return { ...state, applicant };
    }
    case ADD_APPLICANT_SKILL: {
      const skills = [...state.applicant.skills, action.skill];
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

export function setInputSkillVisible(inputSkillVisible) {
  return { type: SET_INPUT_SKILL_VISIBLE, inputSkillVisible };
}

export function setSkill(skill) {
  return { type: SET_SKILL, skill };
}
