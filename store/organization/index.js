export const initState = {
  organizations: [{

  }],
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
