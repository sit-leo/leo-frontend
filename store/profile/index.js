
export const initState = {
  inputSkillVisible: false,
  skill: '',
  inputDocumentVisible: false,
  document: '',
  applicant: {
    applicantId: 0,
    firstName: '',
    lastName: '',
    email: '',
    telNo: '',
    educations: [
      {
        id: 0,
        university: '',
        year: '',
        major: '',
        gpax: '',
      },
    ],
    skills: [],
    experiences: '',
  },
};

export const SET_APPLICANT_PROFILE = 'PROFILE/SET_APPLICANT_PROFILE';
export const SET_INPUT_SKILL_VISIBLE = 'PROFILE/SET_INPUT_SKILL_VISIBLE';
export const SET_SKILL = 'PROFILE/SET_SKILL';
export const SET_FIRSTNAME = 'PROFILE/SET_FIRSTNAME';
export const SET_LASTNAME = 'PROFILE/SET_LASTNAME';
export const SET_APPLICANT_EMAIL = 'PROFILE/SET_APPLICANT_EMAIL';
export const SET_APPLICANT_TELNO = 'PROFILE/SET_APPLICANT_TELNO';
export const SET_EDUCATION = 'PROFILE/SET_EDUCATION';

export const ADD_APPLICANT_SKILL = 'PROFILE/ADD_APPLICANT_SKILL';
export const REMOVE_APPLICANT_SKILL = 'PROFILE/REMOVE_APPLICANT_SKILL';
export const SET_APPLICANT_EXPERIENCES = 'PROFILE/SET_APPLICANT_EXPERIENCES';

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
    case SET_FIRSTNAME: {
      return { ...state, applicant: { ...state.applicant, firstName: action.firstName } };
    }
    case SET_LASTNAME: {
      return { ...state, applicant: { ...state.applicant, lastName: action.lastName } };
    }
    case SET_APPLICANT_EMAIL: {
      return { ...state, applicant: { ...state.applicant, email: action.email } };
    }
    case SET_APPLICANT_TELNO: {
      return { ...state, applicant: { ...state.applicant, telNo: action.telNo } };
    }
    case SET_EDUCATION: {
      const { payload: { field, value } } = action;
      const [education] = state.applicant.educations;
      const educations = [{
        ...education, [field]: value,
      }];
      return { ...state, applicant: { ...state.applicant, educations } };
    }
    case SET_APPLICANT_PROFILE: {
      return { ...state, applicant: action.applicant };
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

export function setFirstname(firstName) {
  return { type: SET_FIRSTNAME, firstName };
}

export function setLastname(lastName) {
  return { type: SET_LASTNAME, lastName };
}

export function setApplicantEmail(email) {
  return { type: SET_APPLICANT_EMAIL, email };
}

export function setApplicantTelno(telNo) {
  return { type: SET_APPLICANT_TELNO, telNo };
}

export function setEducation(field, value) {
  return { type: SET_EDUCATION, payload: { field, value } };
}

export function setApplicantProfile(applicant) {
  return { type: SET_APPLICANT_PROFILE, applicant };
}
