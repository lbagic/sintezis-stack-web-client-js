import { translate } from "../../app/plugins/i18n";
import { messages } from "../../app/translations/messages";

/**
 * @typedef { import("./input.ctl").InputContext } InputContext
 * @typedef { keyof Omit<ValidityState, 'valid'> } HtmlErrorKeys
 * @typedef {{
 *  value: string
 *  parseMessage?: (text: string, ctx: InputContext) => string
 *  validate: (ctx: InputContext) => boolean
 * }} HtmlErrorConfig
 * */

/** @type { Record<HtmlErrorKeys, HtmlErrorConfig> } */
const errorMap = {
  badInput: {
    value: translate(messages.formErrors.badInput),
    validate: () => false,
  },
  patternMismatch: {
    value: translate(messages.formErrors.patternMismatch),
    validate: () => false,
  },
  rangeOverflow: {
    value: translate(messages.formErrors.rangeOverflow),
    parseMessage: (text, { attrs }) => text.replace("%t", attrs.max),
    validate: () => false,
  },
  rangeUnderflow: {
    value: translate(messages.formErrors.rangeUnderflow),
    parseMessage: (text, { attrs }) => text.replace("%t", attrs.min),
    validate: () => false,
  },
  tooLong: {
    value: translate(messages.formErrors.tooLong),
    parseMessage: (text, { attrs }) => text.replace("%t", attrs.maxlength),
    validate: () => false,
  },
  tooShort: {
    value: translate(messages.formErrors.tooShort),
    parseMessage: (text, { attrs }) => text.replace("%t", attrs.minlength),
    validate: () => false,
  },
  stepMismatch: {
    value: translate(messages.formErrors.stepMismatch),
    validate: () => false,
  },
  typeMismatch: {
    value: translate(messages.formErrors.typeMismatch),
    validate: () => false,
  },
  valueMissing: {
    value: translate(messages.formErrors.valueMissing),
    validate: (ctx) => ctx.isRequired && !ctx.model.value,
  },
};
const errorKeys = Object.keys(errorMap);

/** @type { (ctx: InputContext) => Record<keyof typeof errorMap, boolean> } */
function createValidity(ctx) {
  const validity = {};
  errorKeys.forEach((k) => {
    validity[k] = !!ctx.inputRef.validity?.[k] || errorMap[k].validate(ctx);
  });
  return {
    ...validity,
    valid: Object.values(validity).every((value) => !value),
  };
}

/** @type { (ctx: InputContext) => { valid: boolean, error: string } } */
function htmlInputValidation(ctx) {
  const validity = createValidity(ctx);
  const state = { valid: validity.valid, error: null };
  if (!state.valid) {
    const errorKey = errorKeys.find((key) => validity[key] === true);
    const message = errorMap[errorKey].value;
    const parser = errorMap[errorKey].parser;
    state.error = parser ? parser(message, ctx) : message;
  }
  return state;
}

/** @type { (ctx: InputContext) => { valid: boolean, error: string } } */
function customInputValidation(ctx) {
  const validator = ctx.props.validator;
  const state = { valid: true, error: null };
  if (!validator || typeof validator !== "function") return state;
  const output = validator(ctx.model.value);
  if (output === true) return state;
  state.valid = false;
  if (typeof output === "string" && output.length) state.error = output;
  return state;
}

/** @type { (ctx: InputContext) => void } */
export function inputValidation(ctx) {
  const html = htmlInputValidation(ctx);
  const custom = customInputValidation(ctx);
  const valid = html.valid && custom.valid;
  const error = html.error || custom.error;
  // TODO: refactor useHtmlValidation part
  if (ctx.props.useHtmlValidation) {
    if (!valid && error) ctx.inputRef.setCustomValidity(error);
    else ctx.inputRef.setCustomValidity("");
  }

  ctx.model.valid = valid;
  ctx.model.error = error;
}
