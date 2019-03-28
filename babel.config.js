/* eslint-disable func-names */
module.exports = function (api) {
  api.cache(true);

  const presets = [
    'next/babel',
    '@babel/preset-env',
  ];
  const plugins = [
    ['styled-components', { ssr: true }],
  ];

  return {
    presets,
    plugins,
  };
};
