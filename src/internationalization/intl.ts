import { computed, ref } from "vue";
import { de } from "./locale.de";
import { en } from "./locale.en";
import type { IntlMessages } from "./messages";

const locales = { en, de };
export type IntlLocales = keyof typeof locales;

export const activeLocale = ref<IntlLocales>("en");
export function createLocale(localeMessages: IntlMessages) {
  return localeMessages;
}
export function setLocale(locale: IntlLocales) {
  activeLocale.value = locale;
}

export const intl = computed(() => locales[activeLocale.value]);
