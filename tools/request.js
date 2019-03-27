import axios from 'axios';
import cookie from './cookie';

function createApiInstance(isAuthen = false, headers = {}) {
  if (isAuthen) {
    const token = cookie.getToken();
    headers.Authorization = `Bearer ${token}`;
  }
  return axios.create({
    headers,
  });
}

function handleResponse(response) {
  if (response.data) {
    return response;
  }
  return Promise.reject(response.error);
}

function catchError(error) {
  return { error: `Request Error with error = ${error}` };
}


export default {
  get(url, isAuthen) {
    return createApiInstance(isAuthen).get(url).then(handleResponse).catch(catchError);
  },
  post(url, body, isAuthen) {
    return createApiInstance(isAuthen).post(url, body).then(handleResponse).catch(catchError);
  },
  put(url, body, isAuthen) {
    return createApiInstance(isAuthen).put(url, body).then(handleResponse).catch(catchError);
  },
  delete(url, isAuthen) {
    return createApiInstance(isAuthen).delete(url).then(handleResponse).catch(catchError);
  },
};
