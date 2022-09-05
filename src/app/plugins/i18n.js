import { createI18n } from "vue-i18n";
import { languages } from "../translations/messages";

export const i18nPlugin = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: languages,
  legacy: false,
});

export const translate = i18nPlugin.global.t;
