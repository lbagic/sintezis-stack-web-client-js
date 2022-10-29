import { computed, reactive } from "vue";
import { inputValidation } from "./input.validation";
import DateInput from "./DateInput.vue";

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
 *  attrs: Record<string, any>
 *  config: ComponentConfig
 *  inputRef: HTMLInputElement
 *  model: { value: any, valid: boolean, error: null | string, dirty: boolean }
 *  options: Record<string, any>
 *  optionsFlipped: Record<string, any>
 *  props: { strictOptions: boolean }
 *  isRequired: boolean,
 *  setClass: (className: string) => string
 * }} InputContext
 *
 *
 * @typedef {{
 *  attrs: { type?: string }
 *  attrsFactory?: <T>(ctx: InputContext) => T
 *  component: ComponentType
 *  eventsFactory?: (ctx: InputContext) => Record<EventNames, (e: InputEvent) => void>
 *  ids: { uid: string, datalist: string, input: string, hidden: string }
 *  labelPosition: labelPosition
 *  onExternalUpdate: (ctx: InputContext) => any
 *  onInit?: (ctx: InputContext) => any
 *  onInternalUpdate: (ctx: InputContext) => any
 *  parseInputValue: (e: InputEvent, ctx: InputContext) => any
 *  supportOptions: boolean
 * }} ComponentConfig
 * */

/** @type { (ctx: InputContext, options: FPOpts) => Record<string, any> } */
const createFlatpickrConfig = ({ attrs }, componentConfig = {}) => {
  const config = {
    position: "auto center",
    disableMobile: true,
  };
  const userConfig = attrs?.config ?? {};
  if (attrs.min) config.minDate = attrs.min;
  if (attrs.max) config.maxDate = attrs.max;
  if (userConfig?.altFormat) config.altInput = true;

  Object.assign(config, componentConfig, userConfig);
  return config;
};

/** @type { Record<string, ComponentConfig & { hidden: ComponentConfig }> }*/
const components = {
  text: {
    component: "input",
    supportOptions: true,
    attrs: { type: "text" },
  },
  email: {
    component: "input",
    supportOptions: true,
    attrs: { type: "email", name: "email" },
  },
  password: {
    component: "input",
    attrs: { type: "password", name: "password" },
  },
  search: {
    component: "input",
    supportOptions: true,
    attrs: { type: "search", inputmode: "search" },
  },
  tel: {
    component: "input",
    supportOptions: true,
    attrs: { type: "tel", inputmode: "tel" },
  },
  url: {
    component: "input",
    supportOptions: true,
    attrs: { type: "url", inputmode: "url" },
  },
  color: {
    component: "input",
    supportOptions: true,
    attrs: { type: "color" },
  },
  number: {
    component: "input",
    supportOptions: true,
    attrs: { type: "number", inputmode: "numeric" },
    parseInputValue: (e) =>
      isNaN(e.target.valueAsNumber) ? "" : e.target.valueAsNumber,
  },
  range: {
    component: "input",
    supportOptions: true,
    attrs: { type: "range" },
    parseInputValue: (e) => e.target.valueAsNumber,
  },
  checkbox: {
    component: "input",
    attrs: { type: "checkbox" },
    labelPosition: "right",
    parseInputValue(e, { props, model }) {
      const checked = e.target.checked;
      const value = props.value ?? true;
      if (Array.isArray(model.value)) {
        const includes = model.value.includes(value);
        return checked && !includes
          ? [...model.value, value]
          : !checked && includes
          ? model.value.filter((el) => el !== value)
          : model.value;
      }
      return checked ? value : typeof value === "boolean" ? false : "";
    },
    onInternalUpdate({ inputRef, props, model }) {
      const value = props.value ?? true;
      const isChecked = Array.isArray(model.value)
        ? model.value.includes(value)
        : model.value === value;
      inputRef.checked = isChecked;
    },
  },
  radio: {
    component: "input",
    attrs: { type: "radio" },
    labelPosition: "right",
    parseInputValue(e, { props }) {
      const checked = e.target.checked;
      const value = props.value ?? true;
      return checked ? value : typeof value === "boolean" ? false : "";
    },
    onInternalUpdate({ inputRef, props, model }) {
      const value = props.value ?? true;
      inputRef.checked = model.value === value;
    },
  },
  textarea: {
    component: "textarea",
    attrs: {},
  },
  select: {
    component: "select",
    attrs: {},
  },
  date: {
    component: DateInput,
    attrsFactory: (ctx) => ({
      config: createFlatpickrConfig(ctx),
      modelValue: ctx.model.value,
    }),
  },
  time: {
    component: DateInput,
    attrsFactory: (ctx) => ({
      config: createFlatpickrConfig(ctx, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
      }),
    }),
  },
  "datetime-local": {
    component: DateInput,
    attrsFactory: (ctx) => ({
      config: createFlatpickrConfig(ctx, {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        time_24hr: true,
      }),
    }),
  },
  file: {
    component: "input",
    attrs: {
      ["data-pointer-events-disabled"]: true,
    },
    hidden: {
      component: "input",
      attrs: { type: "file" },
    },
  },
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
  return reactive({ isValid, data, validation, errors, model });
}

export const useFormFactory = (config) => {
  const data = Object.fromEntries(
    Object.entries(config).map(([key, { value }]) => [key, value])
  );
  return useFormData(data);
};
