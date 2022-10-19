import { translate } from "../../app/plugins/i18n";
import { messages } from "../../app/translations/messages";

const htmlErrors = {
  badInput: { value: translate(messages.formErrors.badInput) },
  patternMismatch: { value: translate(messages.formErrors.patternMismatch) },
  rangeOverflow: {
    value: translate(messages.formErrors.rangeOverflow),
    parser: (text, { attrs }) => text.replace("%t", attrs.max),
  },
  rangeUnderflow: {
    value: translate(messages.formErrors.rangeUnderflow),
    parser: (text, { attrs }) => text.replace("%t", attrs.min),
  },
  tooLong: {
    value: translate(messages.formErrors.tooLong),
    parser: (text, { attrs }) => text.replace("%t", attrs.maxlength),
  },
  tooShort: {
    value: translate(messages.formErrors.tooShort),
    parser: (text, { attrs }) => text.replace("%t", attrs.minlength),
  },
  stepMismatch: { value: translate(messages.formErrors.stepMismatch) },
  typeMismatch: { value: translate(messages.formErrors.typeMismatch) },
  valueMissing: { value: translate(messages.formErrors.valueMissing) },
};

const htmlErrorKeys = Object.keys(htmlErrors);

function htmlInputValidation({ inputRef, attrs }) {
  const validity = inputRef.validity;
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
  const html = htmlInputValidation({ inputRef, attrs });
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
