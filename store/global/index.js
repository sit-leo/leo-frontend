export const initState = {
  loading: true,
};

// Actions
export const SET_LOADING = 'GLOBAL/SET_LOADING';

// Reducer
export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case SET_LOADING: {
      const loading = action.loading || initState.loading;
      return { ...state, loading };
    }
    default: return { ...state };
  }
}

// Action Creators
export function setLoading(loading) {
  return { type: SET_LOADING, loading };
}
