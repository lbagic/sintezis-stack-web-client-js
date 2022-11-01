<script>
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
function focusFirstInvalidElement(form) {
  if (!form) return;
  const elements = [...form.elements];
  const element = elements.find((el) => el.getAttribute("data-error-active"));
  element.focus({ preventScroll: true });
  element.parentNode.scrollIntoView({ behavior: "smooth" });
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

const id = (props.id ? props.id : _uid++) + "";
const inputId = props.id ?? id + "-input";
const datalistId = inputId + "-datalist";
let formRef = undefined;
const rootRef = $ref(null);
const inputRef = $ref(null);
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

const hasOptions = $computed(() => cfg.supportOptions && props.options);
const options = $computed(() => hasOptions && resolveOptions(props.options));
const hasSelectOptions = $computed(() => hasOptions && type === "select");
const hasInputOptions = $computed(() => hasOptions && type !== "select");
const isRequired = $computed(
  () => attrs.required === "" || attrs.required === true
);
const isSelected = $computed(
  () => options?.values.includes(model.value) && model.value !== ""
);
const isError = $computed(() => !model.valid || model.error);
const showError = $computed(() => isError && model.dirty);
const hasDropdownPicker = $computed(() => hasOptions && type !== "range");
const hasSelectPlaceholder = $computed(
  () => type === "select" && attrs.placeholder && !isSelected
);
let isDropzoneActive = $ref(false);
let isAltFocused = $ref(false);

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

function onInput(event) {
  let value = cfg.parseInputValue
    ? cfg.parseInputValue(event, ctx)
    : event.target.value;
  if (hasOptions)
    value = selectOption(value, options.object, props.strictOptions);
  model.value = value;
  emit("input", model.value);
}
function onFocus(e, mode) {
  if (mode === "alt") isAltFocused = true;
}
function onBlur(e, mode) {
  model.dirty = true;
  if (mode === "alt") isAltFocused = false;
}
function onInvalid(event) {
  if (!props.useHtmlValidation) event.preventDefault();
  focusFirstInvalidElement(formRef);
  validate(ctx);
  model.dirty = true;
}

function onDragStart(e) {
  e.preventDefault();
  isDropzoneActive = true;
}
function onDragFinish() {
  isDropzoneActive = false;
}
const onDragEvents = {
  onDragover: onDragStart,
  onDragenter: onDragStart,
  onDragend: onDragFinish,
  onDragleave: onDragFinish,
  onDrop(e) {
    e.preventDefault();
    onDragFinish();
    model.value = cfg.parseInputValue(e, ctx);
  },
};

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
  if (options) {
    inputRef.value = selectOption(
      model.value,
      options.flipped,
      props.strictOptions,
      inputRef.value
    );
  } else if (cfg.onExternalUpdate) cfg.onExternalUpdate(ctx);
  else inputRef.value = model.value ?? "";
}

watch(() => model, onInternalUpdate, { deep: true });
onMounted(() => {
  formRef = rootRef.closest("form");
  onExternalUpdate(true);
  watch(
    () => [props.modelValue, props.value],
    () => onExternalUpdate(),
    { immediate: true, deep: true }
  );
  watch(
    () => model.value,
    () => validate(ctx),
    { immediate: true }
  );
  if (!model.value) onInput({ target: inputRef });
});

// Root control
const rootAttrs = $computed(() => {
  const base = {
    class: setClass("input-root"),
    for: inputId,
  };
  if (cfg.supportDropzone) Object.assign(base, onDragEvents);
  return base;
});

// Main input control
const mainAttrs = $computed(() => {
  const base = {};

  if (cfg.alt) {
    base.readonly = true;
    base["data-no-pointer-events"] = true;
    base.tabindex = -1;
  } else {
    base.id = inputId;
    base.onInput = onInput;
    base.onInvalid = onInvalid;
    base.onBlur = onBlur;
  }

  if (isAltFocused) base["data-show-focus"] = true;
  if (isDropzoneActive) base["data-dropzone-active"] = true;

  if (isError) base["data-error-active"] = true;
  if (showError && props.useErrorBorder) base["data-error-border"] = true;

  if (hasInputOptions) base.list = datalistId;
  if (hasDropdownPicker) base["data-dropdown-picker"] = true;
  if (hasSelectPlaceholder) base["data-placeholder-color"] = true;

  const factoryAttrs = cfg.attrsFactory?.(ctx);
  return mergeProps(base, cfg.attrs, attrs, factoryAttrs);
});

// Alt input control
const altAttrs = $computed(() => {
  if (!cfg.alt) return;

  const base = {
    onInput,
    onInvalid,
    onFocus: (e) => onFocus(e, "alt"),
    onBlur: (e) => onBlur(e, "alt"),
    class: setClass("alt-input"),
    id: inputId,
  };

  const factoryAttrs = cfg.alt.factoryAttrs?.(ctx);
  return mergeProps(base, cfg.alt.attrs, attrs, factoryAttrs);
});

// Label control
const labelPos =
  props.labelPosition || cfg.labelPosition || settings.labelPosition;
const labelBefore = props.label && (labelPos === "top" || labelPos === "left");
const labelAfter =
  props.label && (labelPos === "bottom" || labelPos === "right");
const labelAttrs = $computed(() => ({
  position: labelPos,
  for: inputId,
  requiredAsterisk: props.useRequiredAsterisk && isRequired,
}));

// Error control
const infoAttrs = $computed(() => ({
  infoSpacing: type !== "radio" && type !== "checkbox" && type !== "range",
  hint: props.hint,
  showError: props.useErrorMessage && showError && !!model.error,
  error: model.error,
}));
</script>

<template>
  <component
    :is="type === 'file' ? 'label' : 'div'"
    v-bind="rootAttrs"
    ref="rootRef"
  >
    <BaseInputLabel v-if="labelBefore" v-bind="labelAttrs">
      {{ props.label }}
    </BaseInputLabel>
    <component
      :is="cfg.component"
      v-bind="mainAttrs"
      :class="[setClass('input'), setClass(`input-${type}`)]"
      ref="inputRef"
    >
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
        <option v-for="key in options.keys" :key="key" :value="key">
          {{ key }}
        </option>
      </template>
    </component>
    <datalist v-if="hasInputOptions" :id="datalistId">
      <option v-for="key in options.keys" :key="key" :value="key"></option>
    </datalist>
    <component v-if="cfg.alt" :is="cfg.alt.component" v-bind="altAttrs" />

    <BaseInputLabel v-if="labelAfter" v-bind="labelAttrs">
      {{ props.label }}
    </BaseInputLabel>

    <BaseInputInfo
      v-if="props.hint || props.useErrorMessage"
      v-bind="infoAttrs"
    />
  </component>
</template>

<style scoped lang="scss"></style>
