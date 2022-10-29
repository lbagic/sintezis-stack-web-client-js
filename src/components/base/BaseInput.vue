<script>
// TODO - implement file input
// TODO - slider/checkbox/radio styles
// TODO - map width to root & wrap elements or prop root-style wrapper-style
// TODO - test performance, maybe some eager computeds?
// TODO - remove input wrapper
// TODO - consider unbundling label and error to different components/slots?
// TODO - BaseInputLabel, BaseInputError

import { useCssVar } from "@vueuse/core";
import "flatpickr/dist/flatpickr.css";
import { h, mergeProps, onMounted, reactive, useAttrs, watch } from "vue";
import { _inputCtl } from "./input.ctl";

export default { inheritAttrs: false };

const { components, settings, validation, parseOptions } = _inputCtl;
const prefix = useCssVar("--prefix").value;
const setClass = (className) => prefix + className;
let _uid = 1;
const calcFormData = (model) => {
  if (typeof model !== "object" || model === null) return false;
  const has = (k) => Object.hasOwn(model, k);
  return has("value") && has("valid") && has("error") && has("dirty");
};
const calcRequired = (required) => required === "" || required === true;
</script>

<script setup>
const props = defineProps({
  modelValue: undefined,
  value: undefined,
  type: { type: String, default: "text" },
  options: undefined,
  strictOptions: { type: Boolean, default: true },
  hint: String,
  label: String,
  labelPosition: String,
  validator: Function,
  useErrorBorder: { type: Boolean, default: settings.useErrorBorder },
  useErrorMessage: { type: Boolean, default: settings.useErrorMessage },
  useHtmlValidation: { type: Boolean, default: settings.useHtmlValidation },
  useRequiredAsterisk: { type: Boolean, default: settings.useRequiredAsterisk },
});

const uid = _uid++;
const emit = defineEmits(["update:modelValue", "input"]);
const attrs = useAttrs();
/** @type { HTMLInputElement } */
const inputRef = $ref(null);
/** @type { HTMLDivElement } */
const rootRef = $ref(null);
/** @type { HTMLFormElement } */
let formRef = undefined;
/** @type { import("./input.ctl").ComponentConfig } */
const config = $computed(() => components[props.type]);
if (!config) throw new Error(`Input type "${props.type}" not supported.`);

const type = $computed(() => config.attrs?.type ?? props.type);
const hasInputOptions = $computed(() => config.supportOptions && props.options);
const hasSelectOptions = $computed(() => type === "select" && props.options);
const hasOptions = $computed(() => hasInputOptions || hasSelectOptions);
const hasDropdownPicker = $computed(() => hasOptions && type !== "range");
const options = $computed(() => hasOptions && parseOptions(props.options));
const optionEntries = $computed(() => Object.entries(options));
const optionValues = $computed(() => Object.values(options));
const optionsFlipped = $computed(() =>
  Object.fromEntries(optionEntries.map(([k, v]) => [v, k]))
);
const ids = {
  uid,
  datalist: `input-datalist-${uid}`,
  input: `input-${type}-${uid}`,
  hidden: `hidden-input-${type}-${uid}`,
};
const isRequired = $computed(() => calcRequired(attrs.required));
const isSelected = $computed(
  () => hasOptions && optionValues.includes(model.value) && model.value !== ""
);

const isFormData = calcFormData(props.modelValue);
const model = reactive({
  value: isFormData ? props.modelValue.value : props.modelValue,
  error: isFormData ? props.modelValue.error : null,
  dirty: isFormData ? props.modelValue.dirty : false,
  valid: isFormData ? props.modelValue.valid : false,
});

/** @type { typeof model } */
let externalModel = $computed({
  get() {
    return isFormData
      ? props.modelValue
      : { ...model, value: props.modelValue ?? props.value };
  },
  set(payload) {
    if (isFormData) Object.assign(props.modelValue, payload);
    else emit("update:modelValue", payload.value);
  },
});

const ctx = $computed(() => ({
  ids,
  attrs,
  inputRef,
  model,
  options,
  props,
  config,
  isRequired,
  setClass,
}));

function validate() {
  validation(ctx);
}
function parseOption(value, options, fallBackValue = "") {
  const option = options[value];
  return option !== undefined
    ? option
    : props.strictOptions
    ? fallBackValue
    : value;
}

function onInput(e) {
  const value = config.parseInputValue
    ? config.parseInputValue(e, ctx)
    : e.target.value;
  model.value = hasOptions ? parseOption(value, options) : value;
  emit("input", model.value);
}
function onBlur() {
  model.dirty = true;
}
function onInvalid(event) {
  if (!props.useHtmlValidation) {
    event.preventDefault();
    const invalidEl = formRef
      ? [...formRef.elements].find((el) => el.getAttribute("data-error-active"))
      : event.target;
    invalidEl.focus({ preventScroll: true });
    invalidEl.parentNode.parentNode.scrollIntoView({ behavior: "smooth" });
  }
  validate();
  model.dirty = true;
}

function onInternalUpdate() {
  config.onInternalUpdate?.(ctx);
  externalModel = model;
}
function onExternalUpdate(forceUpdate) {
  const nothingChanged =
    model.value === externalModel.value &&
    model.error === externalModel.error &&
    model.valid === externalModel.valid &&
    model.dirty === externalModel.dirty;
  if (nothingChanged && !forceUpdate) return;
  Object.assign(model, externalModel);
  if (hasOptions)
    inputRef.value = parseOption(model.value, optionsFlipped, inputRef.value);
  else if (config.onExternalUpdate) config.onExternalUpdate(ctx);
  else inputRef.value = model.value;
}

watch(() => model, onInternalUpdate, { deep: true });
onMounted(() => {
  onExternalUpdate(true);
  watch(() => [props.modelValue, props.value], onExternalUpdate, {
    immediate: true,
    deep: true,
  });
  watch(() => model.value, validate, { immediate: true });
  if (!model.value) onInput({ target: inputRef });
});

// Component state
const showInfoSpacing = $computed(
  () => type !== "radio" && type !== "checkbox" && type !== "range"
);
const showError = $computed(() => model.dirty && (!model.valid || model.error));
const showErrorMessage = $computed(
  () => props.useErrorMessage && showError && !!model.error
);
const showErrorBorder = $computed(() => props.useErrorBorder && showError);
const showRequiredAsterisk = $computed(
  () => props.useRequiredAsterisk && isRequired
);

// Component attributes
const attributes = $computed(() => {
  const baseAttrs = {
    onBlur,
    onInput,
    onInvalid,
    class: [setClass("input"), setClass(`input-${type}`)],
  };
  // inputRef.style.width;
  if (!model.valid) baseAttrs["data-error-active"] = true;
  if (showErrorBorder) baseAttrs["data-error-border-active"] = true;
  if (hasInputOptions) baseAttrs.list = ids.datalist;
  if (hasDropdownPicker) baseAttrs["data-dropdown-picker-active"] = true;

  if (type === "select") {
    if (attrs.placeholder && !isSelected)
      baseAttrs["data-placeholder-color-active"] = true;
  }
  const factoryAttrs = config.attrsFactory?.(ctx);
  return mergeProps(baseAttrs, config.attrs, attrs, factoryAttrs);
});

// Label control
const showLabel = $computed(() => !!props.label);
const labelPosition =
  props.labelPosition || config.labelPosition || settings.labelPosition;
const hasLabelBefore =
  showLabel && (labelPosition === "top" || labelPosition === "left");
const hasLabelAfter =
  showLabel && (labelPosition === "right" || labelPosition === "bottom");

const labelAttributes = $computed(() => ({
  class: setClass("input-label"),
  "data-label-position": labelPosition,
  "data-label-asterisk": showRequiredAsterisk,
}));
const labelNode = () => showLabel && h("span", labelAttributes, props.label);

// Root control
const rootAttributes = $computed(() => {
  const base = {
    class: setClass("input-root"),
  };
  if (config.hidden) base.for = ids.hidden;
  return base;
});

// Hidden control
const hiddenAttrs = $computed(() => {
  const base = {
    class: setClass("alt-input-hidden"),
    id: ids.hidden,
    tabindex: -1,
  };
  return mergeProps(base, config.hidden.attrs);
});

// Info control
const showHint = $computed(() => !!props.hint);
const showInfo = $computed(() => showErrorMessage || showHint);
</script>

<template>
  <label v-bind="rootAttributes" ref="rootRef">
    <labelNode v-if="hasLabelBefore" />
    <div :class="setClass('input-wrapper')">
      <component :is="config.component" v-bind="attributes" ref="inputRef">
        <template v-if="hasSelectOptions">
          <option
            v-if="attrs.placeholder"
            :selected="!isSelected"
            disabled
            hidden
            value=""
          >
            {{ attrs.placeholder }}
          </option>
          <option v-if="!isRequired && isSelected"></option>
          <option v-for="[key] in optionEntries" :key="key" :value="key">
            {{ key }}
          </option>
        </template>
      </component>
      <datalist v-if="hasInputOptions" :id="ids.datalist">
        <option v-for="[key] in optionEntries" :key="key" :value="key"></option>
      </datalist>
      <component
        v-if="config.hidden"
        :is="config.hidden.component"
        v-bind="hiddenAttrs"
      />
    </div>
    <labelNode v-if="hasLabelAfter" />

    <Transition
      :name="setClass('input-info-spacing-transition')"
      v-if="showInfoSpacing"
    >
      <div v-if="showInfo" :class="setClass('input-info-spacing')"></div>
    </Transition>
    <p v-if="showHint" :class="setClass('input-info-hint')">
      {{ props.hint }}
    </p>
    <Transition :name="setClass('input-info-error-transition')">
      <p
        v-if="showHint || showErrorMessage"
        :class="setClass('input-info-error')"
      >
        {{ model.error }}
      </p>
    </Transition>
  </label>
</template>

<style scoped lang="scss"></style>
