<script>
// slider styles
// checkbox/radio styles
// convert attr styles to class styles
export default { inheritAttrs: false };
import { useCssVar } from "@vueuse/core";
import {
  h,
  mergeProps,
  onMounted,
  reactive,
  ref,
  Transition,
  useAttrs,
  watch,
} from "vue";
import { _inputCtl } from "./input.ctl";

const { components, settings, validation, parseOptions } = _inputCtl;
const prefix = useCssVar("--prefix").value;
const setClass = (className) => prefix + className;
let _uid = 1;
const calcFormData = (model) => {
  if (typeof model !== "object") return false;
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
const _inputRef = ref(null);
/** @type { HTMLInputElement } */
const inputRef = $computed(() => _inputRef.value);
/** @type { Record<string, any> } */
const config = $computed(() => components[props.type]);
if (!config) throw new Error(`Input type "${props.type}" not supported.`);
const type = $computed(() => config.attrs.type ?? props.type);
const hasInputOptions = $computed(() => config.supportOptions && props.options);
const hasSelectOptions = $computed(() => type === "select" && props.options);
const hasOptions = $computed(() => hasInputOptions || hasSelectOptions);
const hasDropdownPicker = $computed(() => hasOptions && type !== "range");
const isToggle = $computed(() => type === "radio" || type === "checkbox");
const options = $computed(() => hasOptions && parseOptions(props.options));
const optionEntries = $computed(() => Object.entries(options));
const optionValues = $computed(() => Object.values(options));
const optionsFlipped = $computed(() =>
  Object.fromEntries(optionEntries.map(([k, v]) => [v, k]))
);
const datalistId = `input-datalist-${uid}`;
const isRequired = $computed(() => calcRequired(attrs.required));
const isSelected = $computed(
  () => hasOptions && optionValues.includes(model.value) && model.value !== ""
);

const isFormData = calcFormData(props.modelValue);
const model = reactive({
  value: isFormData ? props.modelValue.value : props.modelValue,
  error: isFormData ? props.modelValue.error : null,
  dirty: isFormData ? props.modelValue.dirty : false,
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
  attrs,
  attributes,
  inputRef,
  model,
  options,
  props,
  config,
  isRequired,
}));

const validate = () => validation(ctx);
const parseDatalist = (value, options, fallBackValue = "") => {
  const option = options[value];
  return option !== undefined
    ? option
    : props.strictOptions
    ? fallBackValue
    : value;
};

const onInput = (e) => {
  const value = config.parseInputValue
    ? config.parseInputValue(e)
    : e.target.value;
  if (hasOptions) model.value = parseDatalist(value, options);
  else if (config.onInternalUpdate) config.onInternalUpdate(e, ctx);
  else model.value = value;
  emit("input", model.value);
};
const onBlur = () => (model.dirty = true);

const onInternalUpdate = () => (externalModel = model);
const onExternalUpdate = () => {
  if (
    model.value === externalModel.value &&
    model.error === externalModel.error &&
    model.valid === externalModel.valid &&
    model.dirty === externalModel.dirty
  )
    return;
  Object.assign(model, externalModel);
  if (hasOptions)
    inputRef.value = parseDatalist(model.value, optionsFlipped, inputRef.value);
  else if (config.onExternalUpdate) config.onExternalUpdate(ctx);
  else inputRef.value = model.value;
};

watch(() => model, onInternalUpdate, { deep: true });
onMounted(() => {
  watch(() => [props.modelValue, props.value], onExternalUpdate, {
    immediate: true,
    deep: true,
  });
  watch(() => model.value, validate, { immediate: true });
});

// Component state
const showError = $computed(() => model.dirty && (!model.valid || model.error));
const showErrorMessage = $computed(
  () => props.useErrorMessage && showError && !!model.error
);
const showErrorBorder = $computed(() => props.useErrorBorder && showError);
const showRequiredAsterisk = $computed(
  () => props.useRequiredAsterisk && isRequired
);
const showErrorSpacing = $computed(() => !isToggle && type !== "range");

// Component attributes
const attributes = $computed(() => {
  const baseAttrs = {
    ref: _inputRef,
    onInput,
    // onChange,
    onBlur,
    class: [setClass("input"), setClass(`input-${type}`)],
  };
  if (showErrorBorder) baseAttrs["data-error-border"] = true;
  if (hasInputOptions) baseAttrs.list = datalistId;
  if (hasDropdownPicker) baseAttrs["data-dropdown-picker"] = true;
  if (isToggle) baseAttrs.value = props.value ?? true;

  if (type === "select") {
    if (attrs.placeholder && !isSelected)
      baseAttrs["data-placeholder-color"] = true;
  }

  return mergeProps(baseAttrs, config.attrs, attrs);
});

// Label control
const labelPosition =
  props.labelPosition || config.labelPosition || settings.labelPosition;
const hasLabelBefore =
  props.label && (labelPosition === "top" || labelPosition === "left");
const hasLabelAfter =
  props.label && (labelPosition === "right" || labelPosition === "bottom");

const labelAttributes = $computed(() => ({
  class: setClass("input-label"),
  "data-label-position": labelPosition,
  "data-label-asterisk": showRequiredAsterisk,
}));

// Info control
const showHint = !!props.hint;
const showInfo = $computed(() => showErrorMessage || showHint);

const infoWrapperAttrs = { name: setClass("input-info-spacing-transition") };
const infoSpacingAttrs = { class: setClass("input-info-spacing") };
const hintAttrs = { class: setClass("input-info-hint") };
const errorWrapperAttrs = { name: setClass("input-info-error-transition") };
const errorAttrs = { class: setClass("input-info-error") };

const inputWrapperAttrs = { class: setClass("input-wrapper") };

const render = () => {
  const rootChildren = [];
  const inputWrapperChildren = [];
  const inputChildren = [];

  const rootNode = h(props.label ? "label" : "div", rootChildren);
  const inputWrapperNode = h("div", inputWrapperAttrs, inputWrapperChildren);
  const inputNode = h(config.component, attributes, inputChildren);
  const labelNode = props.label && h("span", labelAttributes, props.label);

  inputWrapperChildren.push(inputNode);
  if (hasLabelBefore) rootChildren.push(labelNode);
  rootChildren.push(inputWrapperNode);
  if (hasLabelAfter) rootChildren.push(labelNode);

  // info spacing
  if (showErrorSpacing)
    rootChildren.push(
      h(Transition, infoWrapperAttrs, () =>
        showInfo ? h("div", infoSpacingAttrs) : undefined
      )
    );

  // info hint
  if (props.hint) rootChildren.push(h("p", hintAttrs, props.hint));

  // info error
  rootChildren.push(
    h(Transition, errorWrapperAttrs, () =>
      showHint || showErrorMessage ? h("p", errorAttrs, model.error) : undefined
    )
  );

  if (hasSelectOptions) {
    const optionChildren = [];
    if (attributes.placeholder)
      optionChildren.push(
        h(
          "option",
          { selected: !isSelected, disabled: true, hidden: true, value: "" },
          attributes.placeholder
        )
      );
    if (!isRequired && isSelected) optionChildren.push(h("option"));
    optionChildren.push(
      ...optionEntries.map(([key]) => h("option", { key, value: key }, key))
    );
    inputChildren.push(...optionChildren);
  }

  if (hasInputOptions) {
    const datalistChildren = [];
    const datalistNode = h("datalist", { id: datalistId }, datalistChildren);
    datalistChildren.push(
      ...optionEntries.map(([key]) => h("option", { key, value: key }))
    );
    inputWrapperChildren.push(datalistNode);
  }

  return rootNode;
};
</script>

<template>
  <render />
</template>

<style scoped lang="scss"></style>
