// @ts-check

import { en } from "./en";
import { createMessageEnums } from "./messages.util";

export const messageTranslations = {
  en,
};

export const messages = createMessageEnums({
  formErrors: {
    badInput: "",
    patternMismatch: "",
    rangeOverflow: "",
    rangeUnderflow: "",
    tooLong: "",
    tooShort: "",
    stepMismatch: "",
    typeMismatch: "",
    valueMissing: "",
  },
  login: {
    action: "",
    description: "",
  },
});
