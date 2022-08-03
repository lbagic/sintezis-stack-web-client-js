import { useChangeCase } from "@vueuse/integrations/useChangeCase";

String.prototype.toCamelCase = function () {
  return useChangeCase(this, "camelCase");
};
String.prototype.toCapitalCase = function () {
  return useChangeCase(this, "capitalCase");
};
String.prototype.toConstantCase = function () {
  return useChangeCase(this, "constantCase");
};
String.prototype.toDotCase = function () {
  return useChangeCase(this, "dotCase");
};
String.prototype.toHeaderCase = function () {
  return useChangeCase(this, "headerCase");
};
String.prototype.toNoCase = function () {
  return useChangeCase(this, "noCase");
};
String.prototype.toParamCase = function () {
  return useChangeCase(this, "paramCase");
};
String.prototype.toPascalCase = function () {
  return useChangeCase(this, "pascalCase");
};
String.prototype.toPathCase = function () {
  return useChangeCase(this, "pathCase");
};
String.prototype.toSentenceCase = function () {
  return useChangeCase(this, "sentenceCase");
};
String.prototype.toSnakeCase = function () {
  return useChangeCase(this, "snakeCase");
};
