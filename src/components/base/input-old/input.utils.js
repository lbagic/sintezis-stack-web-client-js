let uid = 0;

function getId(propId) {
  const id = (propId ?? ++uid) + "";
  return {
    input: `input-${id}`,
    datalist: `input-${id}-datalist`,
  };
}

function resolveOptions(options) {
  if (options === undefined) return;
  const isArray = Array.isArray(options);
  const entries = isArray
    ? options.map((e) => [e, e])
    : Object.entries(options);
  const object = isArray ? Object.fromEntries(entries) : options;
  const keys = isArray ? options : Object.keys(options);
  const values = isArray ? options : Object.values(options);
  const flipped = isArray
    ? object
    : Object.fromEntries(entries.map(([k, v]) => [v, k]));
  return { object, flipped, entries, keys, values };
}

function selectOptionValue(key, options, strict) {
  const value = options[key];
  if (value !== undefined) return value;
  if (strict) return "";
  return key;
}
function selectOptionKey(value, flippedOptions, fallback = "") {
  const key = flippedOptions[value];
  if (key !== undefined) return key;
  return fallback;
}
function isFormDataModel(modelValue) {
  return (
    typeof modelValue === "object" &&
    Object.hasOwn(modelValue, "value") &&
    Object.hasOwn(modelValue, "valid") &&
    Object.hasOwn(modelValue, "error") &&
    Object.hasOwn(modelValue, "dirty")
  );
}
function focusFirstInvalidElement(form) {
  if (!form) return;
  const elements = [...form.elements];
  const element = elements.find((el) => el.getAttribute("data-error-active"));
  element.focus({ preventScroll: true });
  element.parentNode.scrollIntoView({ behavior: "smooth" });
}

export const inputUtils = {
  getId,
  resolveOptions,
  isFormDataModel,
  focusFirstInvalidElement,
  selectOptionValue,
  selectOptionKey,
};
