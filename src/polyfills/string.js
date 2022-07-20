// String polyfills
const sanitizeString = (str, divider = " ") =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+|[A-Z]|[0-9]+/g)
    .map((el) => el.toLowerCase())
    .join(divider);
const mapUpperCase = (m, char) => char.toUpperCase();

const capitalize = (str) => str.replace(/(\b[a-zA-Z0-9])/g, mapUpperCase);
const toSnakeCase = (str) => sanitizeString(str, "_");
const toKebabCase = (str) => sanitizeString(str, "-");
const toCamelCase = (str) => {
  const sanitized = sanitizeString(str);
  return sanitized.replace(/[^a-zA-Z0-9]+(.)/g, mapUpperCase);
};
const toPascalCase = (str) => {
  const sanitized = " " + sanitizeString(str);
  return sanitized.replace(/[^a-zA-Z0-9]+(.)/g, mapUpperCase);
};

String.prototype.capitalize = function () {
  return capitalize(this);
};
String.prototype.toSnakeCase = function () {
  return toSnakeCase(this);
};
String.prototype.toKebabCase = function () {
  return toKebabCase(this);
};
String.prototype.toCamelCase = function () {
  return toCamelCase(this);
};
String.prototype.toPascalCase = function () {
  return toPascalCase(this);
};
