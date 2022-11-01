import { translate } from "../../app/plugins/i18n";
import { messages } from "../../app/translations/messages";

/**
 * @typedef { import("./input.ctl").InputContext } InputContext
 * @typedef { keyof Omit<ValidityState, 'valid'> } HtmlErrorKeys
 * @typedef {{
 *  message: string
 *  parse?: (text: string, ctx: InputContext) => string
 *  validate: (ctx: InputContext) => boolean
 * }} HtmlErrorConfig
 * */

/** @type { Record<HtmlErrorKeys, HtmlErrorConfig> } */
const errorMap = {
  badInput: {
    message: translate(messages.formErrors.badInput),
    validate: () => false,
  },
  patternMismatch: {
    message: translate(messages.formErrors.patternMismatch),
    validate: () => false,
  },
  rangeOverflow: {
    message: translate(messages.formErrors.rangeOverflow),
    parse: (text, { attrs }) => text.replace("%t", attrs.max),
    validate: () => false,
  },
  rangeUnderflow: {
    message: translate(messages.formErrors.rangeUnderflow),
    parse: (text, { attrs }) => text.replace("%t", attrs.min),
    validate: () => false,
  },
  tooLong: {
    message: translate(messages.formErrors.tooLong),
    parse: (text, { attrs }) => text.replace("%t", attrs.maxlength),
    validate: () => false,
  },
  tooShort: {
    message: translate(messages.formErrors.tooShort),
    parse: (text, { attrs }) => text.replace("%t", attrs.minlength),
    validate: () => false,
  },
  stepMismatch: {
    message: translate(messages.formErrors.stepMismatch),
    validate: () => false,
  },
  typeMismatch: {
    message: translate(messages.formErrors.typeMismatch),
    validate: () => false,
  },
  valueMissing: {
    message: translate(messages.formErrors.valueMissing),
    validate: (ctx) => ctx.isRequired && !ctx.model.value,
  },
};
const errorKeys = Object.keys(errorMap);

/** @type { (ctx: InputContext) => Record<keyof typeof errorMap, boolean> } */
function createValidity(ctx) {
  const validity = {};
  errorKeys.forEach((k) => {
    validity[k] = !!ctx.inputRef?.validity?.[k] || errorMap[k].validate(ctx);
  });
  const valid = Object.values(validity).every((value) => !value);
  return { ...validity, valid };
}

/** @type { (ctx: InputContext) => { valid: boolean, error: string } } */
function htmlInputValidation(ctx) {
  const validity = createValidity(ctx);
  const state = { valid: validity.valid, error: null };
  if (!state.valid) {
    const errorKey = errorKeys.find((key) => validity[key] === true);
    const { message, parse } = errorMap[errorKey];
    state.error = parse?.(message, ctx) ?? message;
  }
  return state;
}

/** @type { (ctx: InputContext) => { valid: boolean, error: string } } */
function customInputValidation(ctx) {
  const state = { valid: true, error: null };
  const error = ctx.props.validator?.(ctx.model.value);
  if (error && typeof error === "string") {
    state.valid = false;
    state.error = error;
  }
  return state;
}

/** @type { (ctx: InputContext) => void } */
export function inputValidation(ctx) {
  const html = htmlInputValidation(ctx);
  const custom = customInputValidation(ctx);
  const valid = html.valid && custom.valid;
  const error = custom.error || html.error;

  if (ctx.props.useHtmlValidation) {
    if (!valid && error) ctx.inputRef.setCustomValidity(error);
    else ctx.inputRef.setCustomValidity("");
  }

  ctx.model.valid = valid;
  ctx.model.error = error;
}
