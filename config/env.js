import getConfig from 'next/config';

const config = getConfig();

const serverEnvironment = (config && config.serverRuntimeConfig) || {};
const publicEnvironment = (config && config.publicRuntimeConfig) || {
  type: 'test',
  matchingApi: '',
  matchApi: '',
  userApi: '',
  reCAPTCHA: '',
};

export default {
  server: serverEnvironment,
  public: publicEnvironment,
};
