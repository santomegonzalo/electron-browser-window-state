module.exports = {
  "extends": "airbnb",
  "plugins": [
    "import"
  ],
  "env": {
    "browser": true,
    "node": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  },
  "rules"  : {
    "no-multi-spaces": ["error", {
      "exceptions": {
        "AssignmentExpression": true
      }
    }]
  }
};
