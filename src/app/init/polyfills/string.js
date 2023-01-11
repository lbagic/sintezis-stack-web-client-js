import * as changeCase from "change-case";
String.prototype.toCamelCase = function () {
  return changeCase.camelCase(this);
};
String.prototype.toCapitalCase = function () {
  return changeCase.capitalCase(this);
};
String.prototype.toConstantCase = function () {
  return changeCase.constantCase(this);
};
String.prototype.toDotCase = function () {
  return changeCase.dotCase(this);
};
String.prototype.toHeaderCase = function () {
  return changeCase.headerCase(this);
};
String.prototype.toNoCase = function () {
  return changeCase.noCase(this);
};
String.prototype.toParamCase = function () {
  return changeCase.paramCase(this);
};
String.prototype.toPascalCase = function () {
  return changeCase.pascalCase(this);
};
String.prototype.toPathCase = function () {
  return changeCase.pathCase(this);
};
String.prototype.toSentenceCase = function () {
  return changeCase.sentenceCase(this);
};
String.prototype.toSnakeCase = function () {
  return changeCase.snakeCase(this);
};
