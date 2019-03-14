import cookie from 'js-cookie';

const COOKIE_TOKEN = 'token';

const inHalfADay = 0.5;

const getToken = () => cookie.get(COOKIE_TOKEN);

const setToken = token => cookie.set(COOKIE_TOKEN, token, { expires: inHalfADay });

const clearToken = () => cookie.remove(COOKIE_TOKEN);

export default {
  getToken,
  setToken,
  clearToken,
};
