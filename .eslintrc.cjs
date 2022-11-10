/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "@vue/eslint-config-prettier",
    "eslint:recommended",
    "plugin:vue/vue3-essential",
  ],
  plugins: ["jsdoc"],
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
  },
  ignorePatterns: ["**/*.d.ts"],
  settings: {
    jsdoc: {
      mode: "typescript",
    },
  },
};
