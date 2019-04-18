const initState = {
  haveRank: false,
  isUpdateRank: false,
};

  // Actions
const SET_HAVE_RANK = 'RANKING/SET_HAVE_RANK';
const SET_IS_UPDATE_RANK = 'RANKING/SET_IS_UPDATE_RANK';

// Reducer
export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case SET_HAVE_RANK: return { ...state, haveRank: action.haveRank };
    case SET_IS_UPDATE_RANK: return { ...state, isUpdateRank: action.isUpdateRank };
    default: return { ...state };
  }
}

// Action Creators
export function setHaveRank(haveRank) {
  return { type: SET_HAVE_RANK, haveRank };
}

export function setIsUpdateRank(isUpdateRank) {
  return { type: SET_IS_UPDATE_RANK, isUpdateRank };
}
