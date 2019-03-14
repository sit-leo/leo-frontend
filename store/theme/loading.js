const initState = {
  loading: false,
};

// Actions
const SET_LOADING = 'leo/theme/loading/set';

// Reducer
export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case SET_LOADING: return { ...state, loading: action.loading };
    default: return { ...state };
  }
}

// Action Creators
export function setLoading(loading) {
  return { type: SET_LOADING, loading };
}
