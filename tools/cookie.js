import cookie from 'js-cookie';

const COOKIE_TOKEN = 'token';

const getToken = (req) => {
  if (process.browser) {
    return cookie.get(COOKIE_TOKEN);
  }
  return req && req.cookies && req.cookies.token;
};

const setToken = (token, expires) => cookie.set(COOKIE_TOKEN, token, { expires: new Date(expires) });

const clearToken = () => cookie.remove(COOKIE_TOKEN);

export default {
  getToken,
  setToken,
  clearToken,
};
