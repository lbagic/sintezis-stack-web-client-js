<script>
export default { inheritAttrs: false };
</script>

<script setup>
import { useDebounceFn } from "@vueuse/shared";
import "flatpickr/dist/flatpickr.css";
import {
  mergeProps,
  nextTick,
  onMounted,
  reactive,
  useAttrs,
  watch,
} from "vue";
import BaseInputInfo from "./BaseInputInfo.vue";
import BaseInputLabel from "./BaseInputLabel.vue";
import { _inputCtl as ctl } from "./input.ctl";

const props = defineProps({
  id: { type: [String, Number] },
  modelValue: { type: undefined },
  value: { type: undefined },
  type: { type: String, default: "text" },
  hint: { type: String },
  label: { type: String },
  labelPosition: { type: String },
  validator: { type: Function },
  options: { type: [Object, Array] },
  strictOptions: { type: Boolean, default: true },
  useErrorBorder: {
    type: Boolean,
    default: ctl.settings.useErrorBorder,
  },
  useErrorMessage: {
    type: Boolean,
    default: ctl.settings.useErrorMessage,
  },
  useHtmlValidation: {
    type: Boolean,
    default: ctl.settings.useHtmlValidation,
  },
  useRequiredAsterisk: {
    type: Boolean,
    default: ctl.settings.useRequiredAsterisk,
  },
});

const attrs = useAttrs();
const emit = defineEmits(["update:modelValue", "input", "search"]);
const cfg = $computed(() => ctl.components[props.type]);
if (!cfg) throw new Error(`Input type "${props.type}" not supported.`);

const isFormData = ctl.isFormDataModel(props.modelValue);
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

const state = reactive({
  id: ctl.getId(props.id),
  formRef: null,
  rootRef: null,
  inputRef: null,
  dropzoneActive: false,
  altFocused: false,
});

const type = $computed(() => cfg.attrs?.type ?? props.type);
const hasOptions = $computed(() => cfg.supportOptions && props.options);
const options = $computed(
  () => hasOptions && ctl.resolveOptions(props.options)
);
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
const labelPos =
  props.labelPosition || cfg.labelPosition || ctl.settings.labelPosition;
const labelBefore = props.label && (labelPos === "top" || labelPos === "left");
const labelAfter =
  props.label && (labelPos === "bottom" || labelPos === "right");
const infoSpacing = type !== "radio" && type !== "checkbox" && type !== "range";

const ctx = $computed(() => ({
  attrs,
  inputRef: state.inputRef,
  model,
  options,
  props,
  config: cfg,
  isRequired,
}));

function onInternalUpdate(e) {
  let value = cfg.parseInputValue
    ? cfg.parseInputValue(e, ctx)
    : e.target.value;
  if (hasOptions)
    value = ctl.selectOptionValue(value, options.object, props.strictOptions);

  model.value = value;
  ctl.validate(ctx);

  cfg.onInternalUpdate?.(ctx);
  externalModel = model;
}

function onExternalUpdate(payload = { forceUpdate: false }) {
  if (!payload.forceUpdate) {
    const noChanges =
      model.value === externalModel.value &&
      model.error === externalModel.error &&
      model.valid === externalModel.valid &&
      model.dirty === externalModel.dirty;
    if (noChanges) return;
  }

  Object.assign(model, externalModel);
  cfg.onExternalUpdate?.(ctx);

  let inputValue = model.value ?? "";
  if (hasOptions)
    inputValue = ctl.selectOptionKey(
      model.value,
      options.flipped,
      state.inputRef.value
    );
  state.inputRef.value = inputValue;
  nextTick(() => {
    ctl.validate(ctx);
    externalModel = model;
  });
}

const search = useDebounceFn((e) => emit("search", e.target.value), 250, {
  maxWait: 600,
});
function onInput(e) {
  onInternalUpdate(e);
  emit("input", e);
  search(e);
}
function onFocus(e, mode) {
  if (mode === "alt") state.altFocused = true;
}
function onBlur(e, mode) {
  model.dirty = true;
  if (mode === "alt") state.altFocused = false;
}
function onInvalid(event) {
  if (!props.useHtmlValidation) event.preventDefault();
  ctl.focusFirstInvalidElement(state.formRef);
  ctl.validate(ctx);
  model.dirty = true;
}

function onDragStart(e) {
  e.preventDefault();
  state.dropzoneActive = true;
}
function onDragFinish() {
  state.dropzoneActive = false;
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

onMounted(() => {
  state.formRef = state.rootRef.closest("form");
  if (hasOptions)
    watch(
      () => props.options,
      () => onExternalUpdate({ forceUpdate: true }),
      { deep: true }
    );
  onExternalUpdate({ forceUpdate: true });
  watch(
    () => [props.modelValue, props.value],
    () => onExternalUpdate(),
    { immediate: true, deep: true }
  );
});

const rootAttributes = $computed(() => {
  const base = {};
  if (cfg.supportDropzone) Object.assign(base, onDragEvents);
  return base;
});

const inputAttributes = $computed(() => {
  const base = {};

  if (cfg.alt) {
    base.readonly = true;
    base["data-no-pointer-events"] = true;
    base.tabindex = -1;
  } else {
    base.id = state.id.input;
    base.onInput = onInput;
    base.onInvalid = onInvalid;
    base.onBlur = onBlur;
  }

  if (hasInputOptions && props.strictOptions) {
    base.autocomplete = "off";
    base.pattern = options.keys.join("|");
  }

  if (state.altFocused) base["data-show-focus"] = true;
  if (state.dropzoneActive) base["data-dropzone-active"] = true;

  if (isError) base["data-error-active"] = true;
  if (showError && props.useErrorBorder) base["data-error-border"] = true;

  if (hasInputOptions) base.list = state.id.datalist;
  if (hasDropdownPicker) base["data-dropdown-picker"] = true;
  if (hasSelectPlaceholder) base["data-placeholder-color"] = true;

  const factoryAttrs = cfg.attrsFactory?.(ctx);
  return mergeProps(base, cfg.attrs, attrs, factoryAttrs);
});

const altInputAttributes = $computed(() => {
  if (!cfg.alt) return;
  const base = {
    onInput,
    onInvalid,
    onFocus: (e) => onFocus(e, "alt"),
    onBlur: (e) => onBlur(e, "alt"),
    id: state.id.input,
  };

  const factoryAttrs = cfg.alt.factoryAttrs?.(ctx);
  return mergeProps(base, cfg.alt.attrs, attrs, factoryAttrs);
});

const labelAttributes = $computed(() => ({
  position: labelPos,
  for: state.id.input,
  requiredAsterisk: props.useRequiredAsterisk && isRequired,
}));

const infoAttributes = $computed(() => ({
  infoSpacing,
  hint: props.hint,
  showError: props.useErrorMessage && showError && !!model.error,
  error: model.error,
}));
</script>

<template>
  <component
    :is="type === 'file' ? 'label' : 'div'"
    v-bind="rootAttributes"
    :ref="(el) => (state.rootRef = el)"
    :class="`${$prefix}input-root`"
    :for="state.id.input"
  >
    <BaseInputLabel v-if="labelBefore" v-bind="labelAttributes">
      {{ props.label }}
    </BaseInputLabel>
    <component
      :is="cfg.component"
      v-bind="inputAttributes"
      :class="`${$prefix}input ${$prefix}input-${type}`"
      :ref="(el) => (state.inputRef = el)"
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
        <option v-if="!isRequired || !isSelected"></option>
        <option v-for="key in options.keys" :key="key" :value="key">
          {{ key }}
        </option>
      </template>
    </component>
    <datalist v-if="hasInputOptions" :id="state.id.datalist">
      <option v-for="key in options.keys" :key="key" :value="key"></option>
    </datalist>
    <component
      v-if="cfg.alt"
      :is="cfg.alt.component"
      :class="`${$prefix}alt-input`"
      v-bind="altInputAttributes"
    />

    <BaseInputLabel v-if="labelAfter" v-bind="labelAttributes">
      {{ props.label }}
    </BaseInputLabel>

    <BaseInputInfo
      v-if="props.hint || props.useErrorMessage"
      v-bind="infoAttributes"
    />
  </component>
</template>

<style scoped lang="scss"></style>
