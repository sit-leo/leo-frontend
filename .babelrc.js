/* eslint-disable func-names */
module.exports = {
  "env": {
    "test": {
      "presets": ["@babel/preset-env"]
    },
    "development": {
      "presets": ["next/babel"]
    },
    "production": {
      "presets": ["next/babel"],
      "plugins": [
        ['styled-components', { ssr: true }],
      ]
    }
  }
}