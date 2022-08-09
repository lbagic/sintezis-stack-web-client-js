import { computed, reactive } from "vue";

const settings = {
  useErrorMessage: true,
  useErrorBorder: true,
  useRequiredAsterisk: true,
  useHtmlValidation: false,
};

const htmlErrors = {
  badInput: { value: "Bad input value." },
  patternMismatch: { value: "Value is not allowed." },
  rangeOverflow: {
    value: "Maximum allowed value is %t.",
    parser: (text, { attrs }) => text.replace("%t", attrs.max),
  },
  rangeUnderflow: {
    value: "Minimum allowed value is %t.",
    parser: (text, { attrs }) => text.replace("%t", attrs.min),
  },
  tooLong: {
    value: "Maximum number of characters is %t.",
    parser: (text, { attrs }) => text.replace("%t", attrs.maxlength),
  },
  tooShort: {
    value: "Minimum number of characters is %t.",
    parser: (text, { attrs }) => text.replace("%t", attrs.minlength),
  },
  stepMismatch: { value: "Input step mismatch." },
  typeMismatch: { value: "Value is not valid." },
  valueMissing: { value: "This field is required" },
};

const componentConfig = {
  text: { component: "default-input" },
  email: { component: "default-input" },
  password: { component: "default-input" },
  search: { component: "default-input" },
  tel: { component: "default-input" },
  url: { component: "default-input" },
  color: { component: "default-input" },
  file: { component: "default-input" },
  number: { component: "number-input" },
  range: { component: "number-input" },
  checkbox: { component: "toggle-input", labelPlacement: "inline end" },
  radio: { component: "toggle-input", labelPlacement: "inline end" },
  textarea: { component: "textarea-input" },
  select: { component: "select-input" },
  "datetime-local": { component: "default-input" },
  date: { component: "default-input" },
  time: { component: "default-input" },
  month: { component: "default-input" },
};

const htmlErrorKeys = Object.keys(htmlErrors);

export const _inputCtl = {
  settings,
  htmlErrors,
  htmlErrorKeys,
  componentConfig,
};

/**
 * Generates reactive form data.
 *
 * @template T
 * @param {T} properties Decsripton.
 * @returns {{
 *   data: T;
 *   validation: Record<keyof T, boolean>;
 *   errors: Partial<Record<keyof T, string | null>>;
 *   model: Record<keyof T, {value: any, isValid: boolean, errorMessage: string | null, isDirty: boolean}>
 *   isValid: boolean;
 * }}
 *   Return description.
 */

export function useFormData(properties) {
  const data = reactive(properties);
  const validation = reactive(
    Object.fromEntries(Object.keys(properties).map((key) => [key, false]))
  );
  const errors = reactive(
    Object.fromEntries(Object.keys(properties).map((key) => [key, null]))
  );
  const isValid = computed(() =>
    Object.values(validation).every((value) => value === true)
  );
  const dirty = reactive(
    Object.fromEntries(Object.keys(properties).map((key) => [key, false]))
  );
  const model = Object.fromEntries(
    Object.keys(properties).map((key) => {
      return [
        key,
        {
          get value() {
            return data[key];
          },
          set value(value) {
            data[key] = value;
          },
          get isValid() {
            return validation[key];
          },
          set isValid(value) {
            validation[key] = value;
          },
          get errorMessage() {
            return errors[key];
          },
          set errorMessage(value) {
            errors[key] = value;
          },
          get isDirty() {
            return dirty[key];
          },
          set isDirty(value = true) {
            dirty[key] = value;
          },
        },
      ];
    })
  );
  return reactive({ isValid, data, validation, errors, model });
}
