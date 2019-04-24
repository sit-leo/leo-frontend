// import Router from 'next/router';

import env from '../../config/env';

const USER_API = env.public.userApi;

export default adapter => ({
  login(credential) {
    return adapter.post(`${USER_API}/login`, credential)
      .then(({ data: jwt }) => jwt);
  },
  getUser(token) {
    return adapter.get(
      `${USER_API}/me`,
      false,
      { Authorization: `Bearer ${token}` },
    )
      .then(({ data: matches }) => matches);
  },
});
