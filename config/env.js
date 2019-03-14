import getConfig from 'next/config';

const config = getConfig();

const serverEnvironment = (config && config.serverRuntimeConfig) || {};
const publicEnvironment = (config && config.publicRuntimeConfig) || {
  type: 'test',
  accountApi: '',
};

export default {
  server: serverEnvironment,
  public: publicEnvironment,
};
