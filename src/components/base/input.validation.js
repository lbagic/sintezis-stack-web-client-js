import { translate } from "../../app/plugins/i18n";
import { messages } from "../../app/translations/messages";

const htmlErrors = {
  badInput: {
    value: translate(messages.formErrors.badInput),
    fallbackValidity: () => false,
  },
  patternMismatch: {
    value: translate(messages.formErrors.patternMismatch),
    fallbackValidity: () => false,
  },
  rangeOverflow: {
    value: translate(messages.formErrors.rangeOverflow),
    parseMessage: (text, { attrs }) => text.replace("%t", attrs.max),
    fallbackValidity: () => false,
  },
  rangeUnderflow: {
    value: translate(messages.formErrors.rangeUnderflow),
    parseMessage: (text, { attrs }) => text.replace("%t", attrs.min),
    fallbackValidity: () => false,
  },
  tooLong: {
    value: translate(messages.formErrors.tooLong),
    parseMessage: (text, { attrs }) => text.replace("%t", attrs.maxlength),
    fallbackValidity: () => false,
  },
  tooShort: {
    value: translate(messages.formErrors.tooShort),
    parseMessage: (text, { attrs }) => text.replace("%t", attrs.minlength),
    fallbackValidity: () => false,
  },
  stepMismatch: {
    value: translate(messages.formErrors.stepMismatch),
    fallbackValidity: () => false,
  },
  typeMismatch: {
    value: translate(messages.formErrors.typeMismatch),
    fallbackValidity: () => false,
  },
  valueMissing: {
    value: translate(messages.formErrors.valueMissing),
    fallbackValidity: ({ value }) => !value,
  },
};
function createFallbackValidity({ value, attrs }) {
  const validity = Object.fromEntries(
    Object.entries(htmlErrors).map(([k, htmlError]) => [
      k,
      htmlError.fallbackValidity({ value, attrs }),
    ])
  );
  return {
    ...validity,
    isValid: Object.values(validity).every((value) => !value),
  };
}

const htmlErrorKeys = Object.keys(htmlErrors);

function htmlInputValidation({ inputRef, value, attrs }) {
  const validity =
    inputRef.validity ?? createFallbackValidity({ value, attrs });
  const isValid = htmlErrorKeys.every((key) => !validity[key]);
  const state = { isValid, errorMessage: null };
  if (!state.isValid) {
    const errorKey = htmlErrorKeys.find((key) => validity[key] === true);
    const message = htmlErrors[errorKey].value;
    const parser = htmlErrors[errorKey].parser;
    state.errorMessage = parser ? parser(message, { attrs }) : message;
  }
  return state;
}

function customInputValidation({ value, props }) {
  const validator = props.validator;
  const state = { isValid: true, errorMessage: null };
  if (!validator || typeof validator !== "function") return state;
  const output = validator(value);
  if (output === true) return state;
  state.isValid = false;
  if (typeof output === "string" && output.length) state.errorMessage = output;
  return state;
}

export function inputValidation({ model, value, props, inputRef, attrs }) {
  const html = htmlInputValidation({ inputRef, value, attrs });
  const custom = customInputValidation({ value, props });
  const isValid = html.isValid && custom.isValid;
  const errorMessage = html.errorMessage || custom.errorMessage;
  if (props.useHtmlValidation) {
    if (!isValid && errorMessage) inputRef.setCustomValidity(errorMessage);
    else inputRef.setCustomValidity("");
  }

  model.valid = isValid;
  model.error = errorMessage;

  return { isValid, errorMessage };
}
