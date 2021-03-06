import Router from 'next/router';

import env from '../../config/env';
import cookie from '../../tools/cookie';

const USER_API = env.public.userApi;

function reloadToHomePage() {
  if (window && window.location.pathname == '/') {
    window.location.reload();
  } else {
    Router.push('/');
  }
}

export default adapter => ({
  login(credential) {
    return adapter.post(`${USER_API}/login`, credential)
      .then(({ data: jwt }) => {
        if (jwt.token) {
          cookie.setToken(jwt.token);
        }
        return jwt;
      });
  },
  logout() {
    return cookie.getToken()
      ? adapter.delete(`${USER_API}/logout`)
        .then(({ status }) => {
          cookie.clearToken();
          reloadToHomePage();
        })
      : reloadToHomePage();
  },
  getUser() {
    return adapter.get(
      `${USER_API}/me`,
    )
      .then(({ data: user }) => user);
  },
  applicantSignup(newUser) {
    return adapter.post(`${USER_API}/user/applicant`, newUser)
      .then(data => data);
  },
  recruiterSignup(newUser) {
    return adapter.post(`${USER_API}/user/recruiter`, newUser)
      .then(data => data);
  },
  changePassword(password) {
    return adapter.put(`${USER_API}/change-password`, password)
      .then(({ data }) => data);
  },
  createOrganization(organizer) {
    return adapter.post(`${USER_API}/user/organizer`, organizer)
      .then(({ data }) => data);
  },
});
