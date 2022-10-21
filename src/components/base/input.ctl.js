import { computed, reactive } from "vue";
import { inputValidation } from "./input.validation";

const settings = {
  useErrorMessage: true,
  useErrorBorder: true,
  useRequiredAsterisk: true,
  useHtmlValidation: false,
  labelPlacement: "top",
};

/**
 * @typedef {{
 *  component: 'input' | 'textarea' | 'select' | 'flatpickr'
 *  supportOptions?: boolean,
 *  labelPlacement: 'top' | 'right' | 'bottom' | 'left'
 *  bind: { type?: string }
 *  modifyAttributes?: <T>(attrs: T) => T
 *  events: Record<string, (e: any, ctx: any) => void>
 *  checkInvalid: boolean,
 * }} ComponentConfig
 * */

// const baseFlatpickrConfig =
//   (baseConfig = {}) =>
//   (attrs) => {
//     const userConfig = attrs.config ? { ...attrs.config } : {};
//     if (attrs.min) userConfig.minDate = attrs.min;
//     if (attrs.max) userConfig.maxDate = attrs.max;
//     userConfig.allowInput = true;
//     return {
//       ...attrs,
//       config: { ...baseConfig, ...userConfig },
//     };
//   };

/** @type { Record<string, ComponentConfig & { shadow?: ComponentConfig }> }*/
const components = {
  text: {
    component: "input",
    supportOptions: true,
    bind: { type: "text" },
  },
  email: {
    component: "input",
    bind: { type: "email" },
  },
  password: {
    component: "input",
    bind: { type: "password" },
  },
  search: {
    component: "input",
    bind: { type: "search" },
  },
  tel: {
    component: "input",
    bind: { type: "tel" },
  },
  url: {
    component: "input",
    bind: { type: "url" },
  },
  color: {
    component: "input",
    bind: { type: "color" },
  },
  number: {
    component: "input",
    bind: { type: "number" },
  },
  range: {
    component: "input",
    bind: { type: "range" },
  },
  checkbox: {
    component: "input",
    bind: { type: "checkbox" },
    labelPlacement: "right",
  },
  radio: {
    component: "input",
    bind: { type: "radio" },
    labelPlacement: "right",
  },
  textarea: {
    component: "textarea",
    bind: {},
  },
  select: {
    component: "select",
    supportOptions: true,
    bind: {},
  },
  // file: {
  //   component: "input",
  //   bind: { type: "text", tabindex: -1 },
  //   shadow: {
  //     component: "input",
  //     bind: {
  //       type: "file",
  //     },
  //     events: {
  //       onChange: (e, { model }) => (model.value = [...e.target.files]),
  //     },
  //     checkInvalid: true,
  //   },
  // },
  // date: {
  //   component: "input",
  //   bind: { type: "text", tabindex: -1 },
  //   shadow: {
  //     component: "flatpickr",
  //     bind: {},
  //     modifyAttributes: baseFlatpickrConfig(),
  //   },
  // },
  // time: {
  //   component: "flatpickr",
  //   bind: {},
  //   modifyAttributes: baseFlatpickrConfig({
  //     enableTime: true,
  //     noCalendar: true,
  //     dateFormat: "H:i",
  //     time_24hr: true,
  //   }),
  // },
  // "datetime-local": {
  //   component: "flatpickr",
  //   bind: {},
  //   modifyAttributes: baseFlatpickrConfig({
  //     enableTime: true,
  //     dateFormat: "Y-m-d H:i",
  //     time_24hr: true,
  //   }),
  // },
  // month: {
  //   // requires using flatpickr plugin
  //   component: "flatpickr",
  //   bind: {},
  //   modifyAttributes: baseFlatpickrConfig(),
  // },
};

export const _inputCtl = {
  settings,
  components,
  inputValidation,
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
 *   model: Record<keyof T, { value: any, valid: boolean, error: string | null, dirty: boolean }>
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
          get valid() {
            return validation[key];
          },
          set valid(value) {
            validation[key] = value;
          },
          get error() {
            return errors[key];
          },
          set error(value) {
            errors[key] = value;
          },
          get dirty() {
            return dirty[key];
          },
          set dirty(value = true) {
            dirty[key] = value;
          },
        },
      ];
    })
  );
  return reactive({ isValid, data, validation, errors, model });
}

export const useFormFactory = (config) => {
  const data = Object.fromEntries(
    Object.entries(config).map(([key, { value }]) => [key, value])
  );
  return useFormData(data);
};
