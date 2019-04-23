require('dotenv').config();

const withCSS = require('@zeit/next-css');

const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = withCSS({
  serverRuntimeConfig: {
    // Will only be available on the server side
    example: 'secret',
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    type: process.env.NODE_ENV,
    matchingApi: process.env.MATCHING_API,
    matchApi: process.env.MATCH_API,
    userApi: process.env.USER_API,
    staticFolder: '/static',
  },
  webpack: (config) => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),
    ];

    return config;
  },
});
