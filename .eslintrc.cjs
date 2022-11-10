/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "@vue/eslint-config-prettier",
    "eslint:recommended",
    "plugin:jsdoc/recommended",
    "plugin:vue/vue3-essential",
  ],
  globals: {
    $ref: "readonly",
    $computed: "readonly",
    $shallowRef: "readonly",
    $customRef: "readonly",
    $toRef: "readonly",
    $: "readonly",
    $$: "readonly",
  },
  rules: {
    "jsdoc/no-undefined-types": 1,
    "jsdoc/require-jsdoc": 0,
    "jsdoc/require-param-description": 0,
    "jsdoc/require-returns": 0,
    "jsdoc/require-returns-description": 0,
    "jsdoc/valid-types": 0,
  },
  ignorePatterns: ["**/*.d.ts"],
  settings: {
    jsdoc: {
      mode: "typescript",
    },
  },
};
