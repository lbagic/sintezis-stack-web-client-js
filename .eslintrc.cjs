/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
    "plugin:jsdoc/recommended",
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
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "vue/require-v-for-key": 0,
    "vue/no-setup-props-destructure": 0,
    "jsdoc/check-line-alignment": 1,
    "jsdoc/no-undefined-types": 1,
    "jsdoc/require-jsdoc": 0,
    "jsdoc/require-param": 0,
    "jsdoc/require-param-description": 0,
    "jsdoc/require-returns": 0,
    "jsdoc/require-returns-description": 0,
    "jsdoc/valid-types": 0,
  },
  ignorePatterns: ["**/*.d.ts", "**/*.ts"],
  settings: {
    jsdoc: {
      mode: "typescript",
    },
  },
};
