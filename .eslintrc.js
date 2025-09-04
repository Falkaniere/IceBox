module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error", { "singleQuote": true }]
  }
};
