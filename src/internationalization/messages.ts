import { HTML_INPUT_ERRORS } from "@/enums/HTML_INPUT_ERRORS";

const messages = {
  HTMLInputErrors: HTML_INPUT_ERRORS.messages,
  login: {
    action: "",
    description: "",
  },
};

export type IntlMessages = typeof messages;
