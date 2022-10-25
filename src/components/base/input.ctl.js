import { computed, reactive } from "vue";
import { inputValidation } from "./input.validation";
// import flatPickr from "vue-flatpickr-component";

const settings = {
  useErrorMessage: true,
  useErrorBorder: true,
  useRequiredAsterisk: true,
  useHtmlValidation: false,
  labelPosition: "top",
};

/**
 * @typedef { 'top' | 'right' | 'bottom' | 'left' } labelPosition
 * @typedef { 'input' | 'textarea' | 'select' | typeof flatPickr } ComponentType
 * @typedef { 'onInput' | 'onChange' | 'onBlur' | 'onFocus' } EventNames
 * @typedef { { target: HTMLInputElement } } InputEvent
 * @typedef {{
 *  attrs: any
 *  attributes: any
 *  config: ComponentConfig
 *  inputRef: HTMLInputElement
 *  model: { value: any, valid: boolean, error: null | string, dirty: boolean }
 *  options: Record<string, any>
 *  optionsFlipped: Record<string, any>
 *  props: { strictOptions: boolean }
 *  isRequired: boolean,
 * }} InputContext
 *
 *
 * @typedef {{
 *  attrs: { type?: string }
 *  attrsFactory?: <T>(ctx: InputContext) => T
 *  component: ComponentType
 *  eventsFactory?: (ctx: InputContext) => Record<EventNames, (e: InputEvent) => void>
 *  labelPosition: labelPosition
 *  onInit?: (ctx: InputContext) => any
 *  supportOptions: boolean
 *  parseInputValue: (e: InputEvent) => any
 *  onInternalUpdate: (e: InputEvent, ctx: InputContext) => any
 *  onExternalUpdate: (ctx: InputContext) => any
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
// text, search, url, tel, email, number
// month, week, date, time, datetime-local
// range
// color
/** @type { Record<string, ComponentConfig> }*/
const components = {
  text: {
    supportOptions: true,
    component: "input",
    attrs: { type: "text" },
  },
  email: {
    supportOptions: true,
    component: "input",
    attrs: { type: "email", name: "email" },
  },
  password: {
    component: "input",
    attrs: { type: "password", name: "password" },
  },
  search: {
    supportOptions: true,
    component: "input",
    attrs: { type: "search", inputmode: "search" },
  },
  tel: {
    supportOptions: true,
    component: "input",
    attrs: { type: "tel", inputmode: "tel" },
  },
  url: {
    supportOptions: true,
    component: "input",
    attrs: { type: "url", inputmode: "url" },
  },
  color: {
    supportOptions: true,
    component: "input",
    attrs: { type: "color" },
  },
  number: {
    supportOptions: true,
    component: "input",
    attrs: { type: "number", inputmode: "numeric" },
    parseInputValue: (e) => e.target.valueAsNumber,
  },
  range: {
    supportOptions: true,
    component: "input",
    attrs: { type: "range" },
    parseInputValue: (e) => e.target.valueAsNumber,
  },
  checkbox: {
    component: "input",
    attrs: { type: "checkbox" },
    labelPosition: "right",
    onInternalUpdate: (e, ctx) => {
      const checked = e.target.checked;
      const v = ctx.attributes.value;
      const m = ctx.model;
      if (Array.isArray(m.value)) {
        if (checked) !m.value.includes(v) && m.value.push(v);
        else m.value = m.value.filter((el) => el !== v);
      } else m.value = checked ? v : typeof v === "boolean" ? false : "";
    },
    onExternalUpdate: ({ inputRef, model, attributes }) =>
      (inputRef.checked = Array.isArray(model.value)
        ? model.value.includes(inputRef.value)
        : attributes.value === model.value),
  },
  radio: {
    component: "input",
    attrs: { type: "radio" },
    labelPosition: "right",
    onInternalUpdate: (e, ctx) => {
      const checked = e.target.checked;
      const v = ctx.attributes.value;
      const m = ctx.model;
      m.value = checked ? v : typeof v === "boolean" ? false : "";
    },
    onExternalUpdate: ({ inputRef, attributes, model }) =>
      (inputRef.checked = attributes.value === model.value),
  },
  textarea: {
    component: "textarea",
    attrs: {},
  },
  select: {
    component: "select",
    attrs: {},
  },
  // file: {
  //   component: "input",
  //   attrs: { type: "text", tabindex: -1 },
  //   shadow: {
  //     component: "input",
  //     attrs: { type: "file" },
  //     events: {
  //       onChange: (e, { model }) => (model.value = [...e.target.files]),
  //     },
  //     checkInvalid: true,
  //   },
  // },
  // date: {
  //   supportOptions: true,
  //   component: "input",
  //   attrs: { type: "text", tabindex: -1 },
  //   shadow: {
  //     component: "flatpickr",
  //     attrs: {},
  //     modifyAttributes: baseFlatpickrConfig(),
  //   },
  // },
  // time: {
  //   supportOptions: true,
  //   component: "flatpickr",
  //   attrs: {},
  //   modifyAttributes: baseFlatpickrConfig({
  //     enableTime: true,
  //     noCalendar: true,
  //     dateFormat: "H:i",
  //     time_24hr: true,
  //   }),
  // },
  // "datetime-local": {
  //   supportOptions: true,
  //   component: "flatpickr",
  //   attrs: {},
  //   modifyAttributes: baseFlatpickrConfig({
  //     enableTime: true,
  //     dateFormat: "Y-m-d H:i",
  //     time_24hr: true,
  //   }),
  // },
  // month: {
  //   supportOptions: true,
  //   // requires using flatpickr plugin
  //   component: "flatpickr",
  //   attrs: {},
  //   modifyAttributes: baseFlatpickrConfig(),
  // },
  // week?
};

const parseOptions = (options) =>
  Array.isArray(options)
    ? Object.fromEntries(options.map((key) => [key, key]))
    : options;

export const _inputCtl = {
  settings,
  components,
  validation: inputValidation,
  parseOptions,
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
  // const model = Object.fromEntries(
  //   Object.keys(properties).map((key) => {
  //     const value = $computed({
  //       get() {
  //         return {
  //           _formDataModel: true,
  //           value: data[key],
  //           valid: validation[key],
  //           error: errors[key],
  //           dirty: dirty[key],
  //         };
  //       },
  //       set(ctx) {
  //         console.log("here", ctx);
  //         data[key] = ctx.value;
  //         validation[key] = ctx.valid;
  //         errors[key] = ctx.error;
  //         dirty[key] = ctx.dirty;
  //       },
  //     });
  //     return [key, value];
  //   })
  // );
  return reactive({ isValid, data, validation, errors, model });
}

export const useFormFactory = (config) => {
  const data = Object.fromEntries(
    Object.entries(config).map(([key, { value }]) => [key, value])
  );
  return useFormData(data);
};
