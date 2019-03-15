import env from '../../config/env';
import request from '../../tools/request';

const USER_API = env.public.userApi;

const initState = {
  username: '',
  user: {},
};

// Actions
const SET_USER = 'leo/user/set';
const SET_USERNAME = 'leo/username/set';

// Reducer
export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case SET_USER: return { ...state, user: action.user };
    case SET_USERNAME: return { ...state, username: action.username };
    default: return { ...state };
  }
}

// Action Creators
export function setUser(user) {
  return { type: SET_USER, user };
}

export function updateUsername(username) {
  return { type: SET_USERNAME, username };
}

export function getUserByUsername(username) {
  return dispatch => request.get(`${USER_API}/${username}`)
    .then((({ data: user }) => dispatch(setUser(user))));
}
