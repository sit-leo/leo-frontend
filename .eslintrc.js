module.exports = {
    "extends": "airbnb",
    "rules": {
        "no-unused-vars": [1],
        "react/jsx-filename-extension": [1, { "extensions": [".js"] }],
        "react/prop-types": [1]
    },
    "overrides": [
        {
          "files": ["*.test.js","*.spec.js"],
          "rules": {
            "no-undef": [0]
          }
        }
    ],
    "env": {
        "browser": true,
    },
};