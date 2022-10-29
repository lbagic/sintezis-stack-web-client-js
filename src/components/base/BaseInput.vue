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
import { mergeProps, onMounted, reactive, useAttrs, watch } from "vue";
import BaseInputInfo from "./BaseInputInfo.vue";
import BaseInputLabel from "./BaseInputLabel.vue";
import { _inputCtl } from "./input.ctl";

export default {
  inheritAttrs: false,
  components: { BaseInputLabel, BaseInputInfo },
};

let _uid = 1;
const prefix = useCssVar("--prefix").value;
const { components, settings, validate } = _inputCtl;

function setClass(className) {
  return prefix + className;
}
function resolveOptions(opts) {
  if (opts === undefined) return;
  const isArray = Array.isArray(opts);
  const entries = isArray ? opts.map((e) => [e, e]) : Object.entries(opts);
  const object = isArray ? Object.fromEntries(entries) : opts;
  const keys = isArray ? opts : Object.keys(opts);
  const values = isArray ? opts : Object.values(opts);
  const flipped = isArray
    ? object
    : Object.fromEntries(entries.map(([k, v]) => [v, k]));
  return { object, flipped, entries, keys, values };
}
function selectOption(value, options, strict, fallBackValue = "") {
  const option = options[value];
  return option !== undefined ? option : strict ? fallBackValue : value;
}
function resolveFormDataType(model) {
  if (typeof model !== "object" || model === null) return false;
  const has = (k) => Object.hasOwn(model, k);
  return has("value") && has("valid") && has("error") && has("dirty");
}
</script>

<script setup>
const props = defineProps({
  id: { type: [String, Number] },
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

let formRef = undefined;
const rootRef = $ref(null);
const inputRef = $ref(null);
const id = (props.id ? props.id : _uid++) + "";
const attrs = useAttrs();
const emit = defineEmits(["update:modelValue", "input"]);
const cfg = $computed(() => components[props.type]);
if (!cfg) throw new Error(`Input type "${props.type}" not supported.`);
const type = $computed(() => cfg.attrs?.type ?? props.type);
const isFormData = resolveFormDataType(props.modelValue);

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

const options = $computed(
  () => cfg.supportOptions && resolveOptions(props.options)
);
const isRequired = $computed(
  () => attrs.required === "" || attrs.required === true
);
const isSelected = $computed(
  () => options?.values.includes(model.value) && model.value !== ""
);
const isError = $computed(() => !model.valid || model.error);
const showError = $computed(() => isError && model.dirty);

const ctx = $computed(() => ({
  attrs,
  inputRef,
  model,
  options,
  props,
  config: cfg,
  isRequired,
  setClass,
}));

function onInput(e) {
  const value = cfg.parseInputValue
    ? cfg.parseInputValue(e, ctx)
    : e.target.value;
  model.value = options
    ? selectOption(value, options.object, props.strictOptions)
    : value;
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
  validate(ctx);
  model.dirty = true;
}

function onInternalUpdate() {
  cfg.onInternalUpdate?.(ctx);
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
  if (options)
    inputRef.value = selectOption(
      model.value,
      options.flipped,
      props.strictOptions,
      inputRef.value
    );
  else if (cfg.onExternalUpdate) cfg.onExternalUpdate(ctx);
  else inputRef.value = model.value ?? "";
}

watch(() => model, onInternalUpdate, { deep: true });
onMounted(() => {
  formRef = rootRef.closest("form");
  onExternalUpdate(true);
  watch(() => [props.modelValue, props.value], onExternalUpdate, {
    immediate: true,
    deep: true,
  });
  watch(
    () => model.value,
    () => validate(ctx),
    { immediate: true }
  );
  if (!model.value) onInput({ target: inputRef });
});

// Component attributes
const attributes = $computed(() => {
  const baseAttrs = {
    onBlur,
    onInput,
    onInvalid,
  };

  // error attrs
  if (isError) baseAttrs["data-error-active"] = true;
  if (showError && props.useErrorBorder)
    baseAttrs["data-error-border-active"] = true;

  // option attrs
  if (options && type !== "select") baseAttrs.list = id + "-datalist";
  if (options && type !== "range")
    baseAttrs["data-dropdown-picker-active"] = true;
  if (type === "select" && attrs.placeholder && !isSelected)
    baseAttrs["data-placeholder-color-active"] = true;

  const factoryAttrs = cfg.attrsFactory?.(ctx);
  return mergeProps(baseAttrs, cfg.attrs, attrs, factoryAttrs);
});

// Label control
const labelPos =
  props.labelPosition || cfg.labelPosition || settings.labelPosition;
const labelBefore = props.label && (labelPos === "top" || labelPos === "left");
const labelAfter =
  props.label && (labelPos === "bottom" || labelPos === "right");
const labelAttrs = $computed(() => ({
  position: labelPos,
  requiredAsterisk: props.useRequiredAsterisk && isRequired,
}));

// Error control
const errorAttrs = $computed(() => ({
  infoSpacing: type !== "radio" && type !== "checkbox" && type !== "range",
  hint: props.hint,
  showError: props.useErrorMessage && showError && !!model.error,
  error: model.error,
}));

// Root control
const rootAttributes = $computed(() => {
  const base = {
    class: setClass("input-root"),
  };
  if (cfg.hidden) base.for = id + "-hidden";
  return base;
});

// Hidden control
const hiddenAttrs = $computed(() => {
  const base = {
    class: setClass("alt-input-hidden"),
    id: id + "-hidden",
    tabindex: -1,
  };
  return mergeProps(base, cfg.hidden.attrs);
});

// Info control
</script>

<template>
  <label v-bind="rootAttributes" ref="rootRef">
    <BaseInputLabel v-if="labelBefore" v-bind="labelAttrs">
      {{ props.label }}
    </BaseInputLabel>
    <component
      :is="cfg.component"
      v-bind="attributes"
      :class="[setClass('input'), setClass(`input-${type}`)]"
      ref="inputRef"
    >
      <template v-if="options && type === 'select'">
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
        <option v-for="key in options.keys" :key="key" :value="key">
          {{ key }}
        </option>
      </template>
    </component>
    <datalist v-if="options && type !== 'select'" :id="id + '-datalist'">
      <option v-for="key in options.keys" :key="key" :value="key"></option>
    </datalist>
    <component
      v-if="cfg.hidden"
      :is="cfg.hidden.component"
      v-bind="hiddenAttrs"
    />

    <BaseInputLabel v-if="labelAfter" v-bind="labelAttrs">
      {{ props.label }}
    </BaseInputLabel>

    <BaseInputInfo
      v-if="props.hint || props.useErrorMessage"
      v-bind="errorAttrs"
    />
  </label>
</template>

<style scoped lang="scss"></style>
