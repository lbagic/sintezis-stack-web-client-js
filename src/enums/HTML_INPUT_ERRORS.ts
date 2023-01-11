import { createEnum } from "@/utils/enums";

export const HTML_INPUT_ERRORS = createEnum({
  valueMissing: "",
  badInput: "",
  typeMismatch: "",
  tooLong: "",
  tooShort: "",
  rangeOverflow: "",
  rangeUnderflow: "",
  stepMismatch: "",
  patternMismatch: "",
} as const);
