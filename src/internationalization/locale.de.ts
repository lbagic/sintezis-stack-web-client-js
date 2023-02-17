import { createLocaleMessages } from "@/internationalization/messages";

export const de = createLocaleMessages({
  HTMLInputErrors: {
    badInput: "Bad input value. YAAAR!",
    patternMismatch: "Value does not match. YAAAR!",
    rangeOverflow: "Maximum allowed value is {max}. YAAAR!",
    rangeUnderflow: "Minimum allowed value is {min}. YAAAR!",
    tooLong: "Maximum number of characters is {maxlength}. YAAAR!",
    tooShort: "Minimum number of characters is {minlength}. YAAAR!",
    stepMismatch: "Value step mismatch. YAAAR!",
    typeMismatch: "Value is not valid. YAAAR!",
    valueMissing: "This field is required. YAAAR!",
  },
  login: {
    action: "Log In YAAAR!",
    description: "Log in to Application YAAAR!",
  },
});
