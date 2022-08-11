import { createI18n } from "vue-i18n";
import { messageTranslations } from "../translations/messages";

export const i18nPlugin = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: messageTranslations,
});
