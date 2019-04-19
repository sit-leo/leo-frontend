const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = ({ config }) => {
  
  config.plugins.push(
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: './static',
      }
    ])
  );

  return config;
}