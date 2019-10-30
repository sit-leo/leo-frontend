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
};

// Actions
export const SET_ORGANIZATIONS = 'MATCH/SET_ORGANIZATIONS';

// Reducer
export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case SET_ORGANIZATIONS: {
      const organizations = action.organizations || initState.organizations;
      return { ...state, organizations };
    }
    default: return { ...state };
  }
}

// Action Creators
export function setOrganizations(organizations) {
  return { type: SET_ORGANIZATIONS, organizations };
}
