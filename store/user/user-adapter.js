import Router from 'next/router';

import env from '../../config/env';
import cookie from '../../tools/cookie';

const USER_API = env.public.userApi;

export default adapter => ({
  login(credential) {
    return adapter.post(`${USER_API}/login`, credential)
      .then(({ data: jwt }) => {
        cookie.setToken(jwt.token);
        Router.push('/');
        return jwt;
      });
  },
  logout() {
    return adapter.post(`${USER_API}/logout`)
      .then(() => {
        cookie.clearToken();
        if (window && window.location.pathname == '/') {
          window.location.reload();
        } else {
          Router.push('/');
        }
      });
  },
  getUser() {
    return adapter.get(
      `${USER_API}/me`,
    )
      .then(({ data: user }) => user);
  },
});
