
export const initState = {
  inputSkillVisible: false,
  skill: '',
  inputDocumentVisible: false,
  document: '',
  files: [],
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
  recruiter: {
    recruiterId: 0,
    name: '',
    description: '',
    email: '',
    telNo: '',
    location: '',
  },
  organizer: {
    organizerId: 0,
    name: '',
    description: '',
  },
  password: {
    currentPassword: '',
    newPassword: '',
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

export const SET_RECRUITER_PROFILE = 'PROFILE/SET_RECRUITER_PROFILE';
export const SET_RECRUITER_NAME = 'PROFILE/SET_RECRUITER_NAME';
export const SET_RECRUITER_LOCATION = 'PROFILE/SET_RECRUITER_LOCATION';
export const SET_RECRUITER_DESCRIPTION = 'PROFILE/SET_RECRUITER_DESCRIPTION';
export const SET_RECRUITER_EMAIL = 'PROFILE/SET_RECRUITER_EMAIL';
export const SET_RECRUITER_TELNO = 'PROFILE/SET_RECRUITER_TELNO';

export const ADD_APPLICANT_SKILL = 'PROFILE/ADD_APPLICANT_SKILL';
export const REMOVE_APPLICANT_SKILL = 'PROFILE/REMOVE_APPLICANT_SKILL';
export const SET_APPLICANT_EXPERIENCES = 'PROFILE/SET_APPLICANT_EXPERIENCES';
export const ADD_APPLICANT_FILE = 'PROFILE/ADD_APPLICANT_FILE';
export const ADD_APPLICANT_FILES = 'PROFILE/ADD_APPLICANT_FILES';

export const SET_ORGANIZER_PROFILE = 'PROFILE/SET_ORGANIZER_PROFILE';

export const SET_PASSWORD = 'PROFILE/SET_PASSWORD';

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
    case SET_RECRUITER_PROFILE: {
      return { ...state, recruiter: action.recruiter };
    }
    case SET_RECRUITER_NAME: {
      return { ...state, recruiter: { ...state.recruiter, name: action.name } };
    }
    case SET_RECRUITER_DESCRIPTION: {
      return { ...state, recruiter: { ...state.recruiter, description: action.description } };
    }
    case SET_RECRUITER_LOCATION: {
      return { ...state, recruiter: { ...state.recruiter, location: action.location } };
    }
    case SET_RECRUITER_EMAIL: {
      return { ...state, recruiter: { ...state.recruiter, email: action.email } };
    }
    case SET_RECRUITER_TELNO: {
      return { ...state, recruiter: { ...state.recruiter, telNo: action.telNo } };
    }
    case ADD_APPLICANT_FILE: {
      const files = [...state.files, action.file];
      return { ...state, files };
    }
    case ADD_APPLICANT_FILES: {
      const files = [...state.files, ...action.files];
      return { ...state, files };
    }
    case SET_ORGANIZER_PROFILE: {
      const organizer = {
        ...state.organizer,
        ...action.organizer,
        organizerId: action.organizer.id,
      };
      return { ...state, organizer };
    }
    case SET_PASSWORD: {
      const { payload: { name, value } } = action;
      return { ...state, password: { ...state.password, [name]: value } };
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

export function setRecruiterProfile(recruiter) {
  return { type: SET_RECRUITER_PROFILE, recruiter };
}

export function setRecruiterName(name) {
  return { type: SET_RECRUITER_NAME, name };
}

export function setRecruiterDescription(description) {
  return { type: SET_RECRUITER_DESCRIPTION, description };
}

export function setRecruiterLocation(location) {
  return { type: SET_RECRUITER_LOCATION, location };
}

export function setRecruiterTelno(telNo) {
  return { type: SET_RECRUITER_TELNO, telNo };
}

export function setRecruiterEmail(email) {
  return { type: SET_RECRUITER_EMAIL, email };
}

export function addApplicantFile(file) {
  return { type: ADD_APPLICANT_FILE, file };
}

export function addApplicantFiles(files) {
  return { type: ADD_APPLICANT_FILES, files };
}

export function setOrganizer(organizer) {
  return { type: SET_ORGANIZER_PROFILE, organizer };
}

export function setPassword(name, value) {
  return { type: SET_PASSWORD, payload: { name, value } };
}
