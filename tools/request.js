import axios from 'axios';
import cookie from './cookie';

function handleResponse(response) {
  if (response.data) {
    return response;
  }
  return Promise.reject(response.error);
}

function catchError(e) {
  return (e && { ...e.response }) || { error: 'unexpected: fetch error' };
}


function instanceBuilder(instance) {
  return ({
    get(url) {
      return instance
        .get(url).then(handleResponse).catch(catchError);
    },
    post(url, body) {
      return instance
        .post(url, body).then(handleResponse).catch(catchError);
    },
    put(url, body) {
      return instance
        .put(url, body).then(handleResponse).catch(catchError);
    },
    delete(url) {
      return instance
        .delete(url).then(handleResponse).catch(catchError);
    },
  });
}

export default instanceBuilder;

export function clientInstance(isAuthen = true, headers = {}) {
  if (isAuthen) {
    const token = cookie.getToken();
    headers.Authorization = `Bearer ${token}`;
  }
  return instanceBuilder(axios.create({
    headers,
  }));
}

export function serverInstance(token, isAuthen = true, headers = {}) {
  if (isAuthen) {
    headers.Authorization = `Bearer ${token}`;
  }
  return instanceBuilder(axios.create({
    headers,
  }));
}
