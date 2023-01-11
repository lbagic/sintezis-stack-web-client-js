// import { STRING } from "@/app/plugins/i18n";

/**
 * @typedef { import("./input.ctl").InputContext } InputContext
 * @typedef { keyof Omit<ValidityState, 'valid'> } HtmlErrorKeys
 * @typedef {{
 *  message: string
 *  parse?: (text: string, ctx: InputContext) => string
 *  check: (ctx: InputContext) => boolean
 * }} HtmlErrorConfig
 */

/** @type { Record<HtmlErrorKeys, HtmlErrorConfig> } */
const errorMap = {
  badInput: {
    // message: STRING.HTMLInputErrors.badInput,
    message: "",
    check: () => false,
  },
  patternMismatch: {
    // message: STRING.HTMLInputErrors.patternMismatch,
    message: "",
    check: () => false,
  },
  rangeOverflow: {
    // message: STRING.HTMLInputErrors.rangeOverflow,
    message: "",
    parse: (text, { attrs }) => text.replace("%t", attrs.max),
    check: () => false,
  },
  rangeUnderflow: {
    // message: STRING.HTMLInputErrors.rangeUnderflow,
    message: "",
    parse: (text, { attrs }) => text.replace("%t", attrs.min),
    check: () => false,
  },
  tooLong: {
    // message: STRING.HTMLInputErrors.tooLong,
    message: "",
    parse: (text, { attrs }) => text.replace("%t", attrs.maxlength),
    check: (ctx) =>
      !!ctx.attrs.maxlength && ctx.model.value?.length > ctx.attrs.maxlength,
  },
  tooShort: {
    // message: STRING.HTMLInputErrors.tooShort,
    message: "",
    parse: (text, { attrs }) => text.replace("%t", attrs.minlength),
    check: (ctx) =>
      !!ctx.attrs.minlength && ctx.model.value?.length < ctx.attrs.minlength,
  },
  stepMismatch: {
    // message: STRING.HTMLInputErrors.stepMismatch,
    message: "",
    check: () => false,
  },
  typeMismatch: {
    message: "",
    // message: STRING.HTMLInputErrors.typeMismatch,
    check: () => false,
  },
  valueMissing: {
    message: "",
    // message: STRING.HTMLInputErrors.valueMissing,
    check: (ctx) =>
      ctx.isRequired &&
      (ctx.model.value === "" || ctx.model.value === undefined),
  },
};
const errorKeys = Object.keys(errorMap);

/** @type { (ctx: InputContext) => Record<keyof typeof errorMap, boolean> } */
function createValidity(ctx) {
  const validity = {};
  errorKeys.forEach((k) => {
    validity[k] = !!ctx.inputRef?.validity?.[k] || errorMap[k].check(ctx);
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
