import { computed, reactive } from "vue";
import { runInputValidation } from "./input.validation";

// TODO - rework with tags instead of custom component types

const settings = {
  useErrorMessage: true,
  useErrorBorder: true,
  useRequiredAsterisk: true,
  useHtmlValidation: false,
  labelPlacement: "block start",
};

/** @typedef { 'default-input' | 'textarea-input' | 'select-input' } ComponentTypes */
/** @typedef { 'inline start' | 'inline end' | 'block start' | 'block end' } LabelPlacement */
/** @typedef { { component: ComponentTypes, labelPlacement?: LabelPlacement  } } ComponentConfig */

/** @type { Record<any, ComponentConfig> } */
const config = {
  text: { component: "default-input" },
  email: { component: "default-input" },
  password: { component: "default-input" },
  search: { component: "default-input" },
  tel: { component: "default-input" },
  url: { component: "default-input" },
  color: { component: "default-input" },
  file: { component: "default-input" },
  number: { component: "default-input" },
  range: { component: "default-input" },
  checkbox: { component: "default-input", labelPlacement: "inline end" },
  radio: { component: "default-input", labelPlacement: "inline end" },
  textarea: { component: "textarea-input" },
  select: { component: "select-input" },
  "datetime-local": { component: "default-input" },
  date: { component: "default-input" },
  time: { component: "default-input" },
  month: { component: "default-input" },
};

export const _inputCtl = {
  settings,
  config,
  runInputValidation,
};

/**
 * Generates reactive form data.
 *
 * @template T
 * @param { T } properties Decsripton.
 * @returns {{
 *   data: T;
 *   validation: Record<keyof T, boolean>;
 *   errors: Partial<Record<keyof T, string | null>>;
 *   model: Record<keyof T, { value: any, isValid: boolean, errorMessage: string | null, isDirty: boolean }>
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
          _formDataModel: true,
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

export const useFormDataConfig = (config) => {
  const data = Object.fromEntries(
    Object.entries(config).map(([key, { value }]) => [key, value])
  );
  return useFormData(data);
};
