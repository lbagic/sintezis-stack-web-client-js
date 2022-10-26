import { computed, reactive } from "vue";
import { inputValidation } from "./input.validation";
import flatPickr from "vue-flatpickr-component";
// import { format as dateFnsFormat, parse as dateFnsParse } from "date-fns/esm";

const settings = {
  useErrorMessage: true,
  useErrorBorder: true,
  useRequiredAsterisk: true,
  useHtmlValidation: false,
  labelPosition: "top",
};

/**
 * @typedef {{
 *  allowInput: boolean;
 *  allowInvalidPreload: boolean;
 *  altFormat: string;
 *  altInput: boolean;
 *  altInputClass: string;
 *  animate: boolean;
 *  appendTo: HTMLElement;
 *  ariaDateFormat: string;
 *  autoFillDefaultTime: boolean;
 *  clickOpens: boolean;
 *  closeOnSelect: boolean;
 *  conjunction: string;
 *  dateFormat: string;
 *  defaultDate: DateOption | DateOption[];
 *  defaultHour: number;
 *  defaultMinute: number;
 *  defaultSeconds: number;
 *  disable: DateLimit<DateOption>[];
 *  disableMobile: boolean;
 *  enable: DateLimit<DateOption>[];
 *  enableSeconds: boolean;
 *  enableTime: boolean;
 *  errorHandler: (e: Error) => void;
 *  formatDate: (date: Date, format: string, locale: Locale) => string;
 *  getWeek: (date: Date) => string | number;
 *  hourIncrement: number;
 *  ignoredFocusElements: HTMLElement[];
 *  inline: boolean;
 *  locale: LocaleKey | Partial<CustomLocale>;
 *  maxDate: DateOption;
 *  maxTime: DateOption;
 *  minDate: DateOption;
 *  minTime: DateOption;
 *  minuteIncrement: number;
 *  mode: "single" | "multiple" | "range" | "time";
 *  monthSelectorType: "dropdown" | "static";
 *  nextArrow: string;
 *  noCalendar: boolean;
 *  now?: DateOption;
 *  onChange: Hook | Hook[];
 *  onClose: Hook | Hook[];
 *  onDayCreate: Hook | Hook[];
 *  onDestroy: Hook | Hook[];
 *  onKeyDown: Hook | Hook[];
 *  onMonthChange: Hook | Hook[];
 *  onOpen: Hook | Hook[];
 *  onParseConfig: Hook | Hook[];
 *  onReady: Hook | Hook[];
 *  onValueUpdate: Hook | Hook[];
 *  onYearChange: Hook | Hook[];
 *  onPreCalendarPosition: Hook | Hook[];
 *  parseDate: (date: string, format: string) => Date;
 *  plugins: Plugin[];
 *  position: "auto" | "above" | "below" | "auto left" | "auto center" | "auto right" | "above left" | "above center" | "above right" | "below left" | "below center" | "below right" | ((self: Instance, customElement: HTMLElement | undefined) => void);
 *  positionElement: Element;
 *  prevArrow: string;
 *  shorthandCurrentMonth: boolean;
 *  static: boolean;
 *  showMonths?: number;
 *  time_24hr: boolean;
 *  weekNumbers: boolean;
 *  wrap: boolean;
 * }} FPOpts
 * */

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
 *  labelPosition: labelPosition
 *  onInit?: (ctx: InputContext) => any
 *  supportOptions: boolean
 *  parseInputValue: (e: InputEvent, ctx: InputContext) => any
 *  onInternalUpdate: (ctx: InputContext) => any
 *  onExternalUpdate: (ctx: InputContext) => any
 * }} ComponentConfig
 * */

// const _d = new Date();
// const formatDateFactory = (format) => (date) => {
//   const formatted = dateFnsFormat(date, format);
//   console.log({ date, format, formatted });
//   return formatted;
// };
// const parseDateFactory = (format) => (datestr) => {
//   const parsed = dateFnsParse(datestr, format, _d);
//   console.log({ format, datestr, parsed });
//   return parsed;
// };

/** @type { (ctx: InputContext, options: FPOpts) => Record<string, any> } */
const createFlatpickrConfig = ({ attrs }, componentConfig = {}) => {
  const config = {
    position: "auto center",
  };
  const userConfig = attrs.config;
  if (attrs.min) config.minDate = attrs.min;
  if (attrs.max) config.maxDate = attrs.max;
  // dateFormat: "YYYY-MM-DD",
  // formatDate: (date, format, locale) => {
  //   // locale can also be used
  //   return moment(date).format(format);
  // }
  // altInput: true,
  // altFormat: "DD-MM-YYYY",
  // parseDate: (datestr, format) => {
  //   return moment(datestr, format, true).toDate();
  // },

  // if (props.dateFormat) {
  //   config.dateFormat = props.dateFormat;
  //   config.formatDate = formatDateFactory(props.dateFormat);
  // }
  // if (props.dateDisplayFormat) {
  //   config.altInput = true;
  //   config.altFormat = props.dateDisplayFormat;
  //   config.parseDate = parseDateFactory(props.dateDisplayFormat);
  // }

  Object.assign(config, componentConfig, userConfig);
  return config;
};

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
    component: flatPickr,
    attrs: {
      config: { position: "auto center" },
    },
    // attrsFactory: (ctx) => ({ modelValue: ctx.model.value }),
    attrsFactory: (ctx) => ({
      config: createFlatpickrConfig(ctx),
      modelValue: ctx.model.value,
    }),
  },
  // date: {
  //   supportOptions: true,
  //   component: "input",
  //   attrs: { type: "text", tabindex: -1 },
  //   shadow: {
  //     component: "flatpickr",
  //     attrs: {},
  //     modifyAttributes: createFlatpickrOptions(),
  //   },
  // },
  // time: {
  //   supportOptions: true,
  //   component: "flatpickr",
  //   attrs: {},
  //   modifyAttributes: createFlatpickrOptions({
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
  //   modifyAttributes: createFlatpickrOptions({
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
  //   modifyAttributes: createFlatpickrOptions(),
  // },
  // week?
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
