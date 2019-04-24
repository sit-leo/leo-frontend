export const initState = {
  jwt: {
    token: '',
    expires: 0,
  },
  username: '',
  password: '',
};

  // Actions
export const SET_JWT = 'USER/SET_JWT';
export const SET_USERNAME = 'USER/SET_USERNAME';
export const SET_PASSWORD = 'USER/SET_PASSWORD';

// Reducer
export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case SET_JWT: {
      const jwt = action.jwt || initState.jwt;
      return { ...state, jwt };
    }
    case SET_USERNAME: {
      const username = action.username || initState.username;
      return { ...state, username };
    }
    case SET_PASSWORD: {
      const password = action.password || initState.password;
      return { ...state, password };
    }
    default: return { ...state };
  }
}

// Action Creators
export function setJwt(jwt) {
  return { type: SET_JWT, jwt };
}

export function setUsername(username) {
  return { type: SET_USERNAME, username };
}

export function setPassword(password) {
  return { type: SET_PASSWORD, password };
}
