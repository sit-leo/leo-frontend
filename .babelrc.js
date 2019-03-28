/* eslint-disable func-names */
module.exports = {
  "env": {
    "test": {
      "presets": ["@babel/preset-env"]
    },
    "development": {
      "presets": ["next/babel"],
      "plugins": [
        ['styled-components', { ssr: true }],
      ]
    },
    "production": {
      "presets": ["next/babel"],
      "plugins": [
        ['styled-components', { ssr: true }],
      ]
    }
  }
}