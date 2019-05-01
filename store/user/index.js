export const initState = {
  jwt: {
    token: '',
    expires: 0,
  },
  id: 0,
  role: 'guest',
  username: '',
  password: '',
};

  // Actions
export const SET_JWT = 'USER/SET_JWT';
export const SET_ID = 'USER/SET_ID';
export const SET_ROLE = 'USER/SET_ROLE';
export const SET_USERNAME = 'USER/SET_USERNAME';
export const SET_PASSWORD = 'USER/SET_PASSWORD';

// Reducer
export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case SET_JWT: {
      const jwt = action.jwt || initState.jwt;
      return { ...state, jwt };
    }
    case SET_ID: {
      const id = action.id || initState.id;
      return { ...state, id };
    }
    case SET_ROLE: {
      const role = action.role || initState.role;
      return { ...state, role };
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

export function setId(id) {
  return { type: SET_ID, id };
}

export function setRole(role) {
  return { type: SET_ROLE, role };
}

export function setUsername(username) {
  return { type: SET_USERNAME, username };
}

export function setPassword(password) {
  return { type: SET_PASSWORD, password };
}
