const initOrganization = {
  id: 0,
  name: 'Organization Name',
  description: 'Organization Description',
  numOfApplicant: 0,
  numOfRecruiter: 0,
};

export const initState = {
  organizations: [
    initOrganization,
    initOrganization,
    initOrganization,
  ],
  organization: initOrganization,
  applicants: [],
  recruiters: [],
  statistics: {
    numberOfMatches: 0,
    numberOfApplicants: 0,
    numberOfRecruiters: 0,
  },
};

// Actions
export const SET_ORGANIZATIONS = 'ORGANIZATION/SET_ORGANIZATIONS';

export const SET_APPLICANTS = 'ORGANIZATION/SET_APPLICANTS';
export const SET_RECRUITERS = 'ORGANIZATION/SET_RECRUITERS';

export const SET_STATISTICS = 'ORGANIZATION/SET_STATISTICS';

// Reducer
export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case SET_ORGANIZATIONS: {
      const organizations = action.organizations || initState.organizations;
      return { ...state, organizations };
    }
    case SET_APPLICANTS: {
      const applicants = action.applicants || initState.applicants;
      return { ...state, applicants };
    }
    case SET_RECRUITERS: {
      const recruiters = action.recruiters || initState.recruiters;
      return { ...state, recruiters };
    }
    case SET_STATISTICS: {
      const statistics = action.statistics || initState.statistics;
      return { ...state, statistics };
    }
    default: return { ...state };
  }
}

// Action Creators
export function setOrganizations(organizations) {
  return { type: SET_ORGANIZATIONS, organizations };
}

export function setApplicants(applicants) {
  return { type: SET_APPLICANTS, applicants };
}

export function setRecruiters(recruiters) {
  return { type: SET_RECRUITERS, recruiters };
}

export function setStatistics(statistics) {
  return { type: SET_STATISTICS, statistics };
}
