import { computed, reactive } from "vue";
import { inputValidation } from "./input.validation";
import DateInput from "./DateInput.vue";
import DateInputVue from "./DateInput.vue";

const settings = {
  useErrorMessage: true,
  useErrorBorder: true,
  useRequiredAsterisk: true,
  useHtmlValidation: false,
  labelPosition: "top",
};

/**
 * @typedef { "top" | "right" | "bottom" | "left" } labelPosition
 * @typedef { "input" | "textarea" | "select" | typeof DateInputVue } ComponentType
 * @typedef { "onInput" | "onChange" | "onBlur" | "onFocus" } EventNames
 * @typedef { { target: HTMLInputElement } } InputEvent
 * @typedef {{
 *  attrs: Record<string, any>
 *  config: ComponentConfig
 *  inputRef: HTMLInputElement
 *  model: { value: any, valid: boolean, error: null | string, dirty: boolean }
 *  options: Record<string, any>
 *  props: { strictOptions: boolean, validator?: Function }
 *  isRequired: boolean,
 *  setClass: (className: string) => string
 * }} InputContext
 * @typedef {{
 *  attrs: { type?: string }
 *  attrsFactory?: <T>(ctx: InputContext) => T
 *  component: ComponentType
 *  eventsFactory?: (ctx: InputContext) => Record<EventNames, (e: InputEvent) => void>
 *  labelPosition: labelPosition
 *  onExternalUpdate: (ctx: InputContext) => any
 *  onInit?: (ctx: InputContext) => any
 *  onInternalUpdate: (ctx: InputContext) => any
 *  parseInputValue: (e: InputEvent, ctx: InputContext) => any
 *  supportOptions: boolean
 *  supportDropzone: boolean
 * }} ComponentConfig
 * @typedef { import("flatpickr/dist/types/options").Options } FlatpickrOptions
 * */

/** @type { (ctx: InputContext, options: FlatpickrOptions) => Record<string, any> } */
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

/** @type { Record<string, ComponentConfig & { alt: ComponentConfig }> }*/
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
    supportOptions: true,
    component: "select",
    attrs: {},
  },
  file: {
    component: "input",
    supportDropzone: true,
    parseInputValue(e, ctx) {
      const fileList = e.target?.files ?? e.dataTransfer?.files;
      const isArray = ctx.attrs.multiple === "" || ctx.attrs.multiple === true;
      if (!fileList) return isArray ? [] : "";
      const allowedTypes = ctx.attrs.accept?.split(",")?.map((el) => el.trim());
      const files = !allowedTypes
        ? [...fileList]
        : [...fileList].filter(({ type }) => allowedTypes.includes(type));
      const names = files.map((file) => file.name);
      ctx.inputRef.value = names.join(", ");
      return isArray ? files : files[0];
    },
    onExternalUpdate() {},
    alt: {
      component: "input",
      attrs: { type: "file" },
    },
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
};

export const _inputCtl = {
  settings,
  components,
  validate: inputValidation,
};

/**
 * Generates reactive form data.
 *
 * @template T
 * @param { T } properties Decsripton.
 * @returns {{
 *   data: T;
 *   model: Record<keyof T, { value: any, valid: boolean, error: string | null, dirty: boolean }>
 *   isValid: boolean;
 * }}
 */
export function useFormData(properties) {
  const keys = Object.keys(properties);
  const ctx = reactive({
    value: properties,
    dirty: Object.fromEntries(keys.map((key) => [key, false])),
    error: Object.fromEntries(keys.map((key) => [key, null])),
    valid: Object.fromEntries(keys.map((key) => [key, false])),
  });
  const isValid = computed(() => keys.every((key) => ctx.valid[key] === true));
  const model = Object.fromEntries(
    keys.map((key) => [
      key,
      {
        get value() {
          return ctx.value[key];
        },
        set value(value) {
          ctx.value[key] = value;
        },
        get valid() {
          return ctx.valid[key];
        },
        set valid(value) {
          ctx.valid[key] = value;
        },
        get error() {
          return ctx.error[key];
        },
        set error(value) {
          ctx.error[key] = value;
        },
        get dirty() {
          return ctx.dirty[key];
        },
        set dirty(value = true) {
          ctx.dirty[key] = value;
        },
      },
    ])
  );
  return reactive({ data: ctx.value, isValid, model });
}

export const useFormFactory = (config) => {
  const data = Object.fromEntries(
    Object.entries(config).map(([key, { value }]) => [key, value])
  );
  return useFormData(data);
};
