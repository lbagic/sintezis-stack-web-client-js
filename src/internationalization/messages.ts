import { HTML_INPUT_ERRORS } from "@/enums/HTML_INPUT_ERRORS";
import { ROLES } from "@/enums/ROLES";

export type IntlMessages = typeof messages;
export const createLocaleMessages = (messages: IntlMessages) => messages;

const messages = {
  HTMLInputErrors: HTML_INPUT_ERRORS.messages,
  roles: ROLES.messages,
  login: {
    action: "",
    description: "",
  },
};
