module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react-native/all",
    "prettier", // turn off ESLint rules that conflict with Prettier
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "react-native", "prettier"],
  rules: {
    "prettier/prettier": "error", // show prettier errors in ESLint
    "react/react-in-jsx-scope": "off", // not needed in React Native
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
