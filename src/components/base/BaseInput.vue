<script>
// slider styles
// checkbox/radio styles
// convert attr styles to class styles
export default { inheritAttrs: false };
import { useCssVar } from "@vueuse/core";
import "flatpickr/dist/flatpickr.css";
import { h, mergeProps, onMounted, reactive, ref, useAttrs, watch } from "vue";
import { _inputCtl } from "./input.ctl";
import flatPickr from "vue-flatpickr-component";

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
  dateFormat: String,
  dateDisplayFormat: String,
});

const uid = _uid++;
const emit = defineEmits(["update:modelValue", "input"]);
const attrs = useAttrs();
const _inputRef = ref(null);
/** @type { HTMLInputElement } */
const inputRef = $computed(() => _inputRef.value);
/** @type { import("./input.ctl").ComponentConfig } */
const config = $computed(() => components[props.type]);
if (!config) throw new Error(`Input type "${props.type}" not supported.`);
const type = $computed(() => config.attrs.type ?? props.type);
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

function onInternalUpdate() {
  config.onInternalUpdate?.(ctx);
  externalModel = model;
}
function onExternalUpdate() {
  if (
    model.value === externalModel.value &&
    model.error === externalModel.error &&
    model.valid === externalModel.valid &&
    model.dirty === externalModel.dirty
  )
    return;
  Object.assign(model, externalModel);
  if (hasOptions)
    inputRef.value = parseOption(model.value, optionsFlipped, inputRef.value);
  else if (config.onExternalUpdate) config.onExternalUpdate(ctx);
  else inputRef.value = model.value;
}

watch(() => model, onInternalUpdate, { deep: true });
onMounted(() => {
  watch(() => [props.modelValue, props.value], onExternalUpdate, {
    immediate: true,
    deep: true,
  });
  watch(() => model.value, validate, { immediate: true });
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

const flatPickrAttrs = reactive({ config: {} });

// Component attributes
const attributes = $computed(() => {
  const baseAttrs = {
    ref: _inputRef,
    onBlur,
    onInput,
    class: [setClass("input"), setClass(`input-${type}`)],
  };
  if (showErrorBorder) baseAttrs["data-error-border"] = true;
  if (hasInputOptions) baseAttrs.list = datalistId;
  if (hasDropdownPicker) baseAttrs["data-dropdown-picker"] = true;

  // refactor to factory attrs
  if (type === "select") {
    if (attrs.placeholder && !isSelected)
      baseAttrs["data-placeholder-color"] = true;
  }
  const factoryAttrs = config.attrsFactory?.(ctx);
  if (config.component === flatPickr)
    Object.assign(flatPickrAttrs.config, factoryAttrs?.config);

  return mergeProps(
    baseAttrs,
    config.attrs,
    factoryAttrs,
    attrs,
    flatPickrAttrs
  );
});

// Label control
const showLabel = $computed(() => !!props.label);
const labelPosition =
  props.labelPosition || config.labelPosition || settings.labelPosition;
const hasLabelBefore =
  showLabel && (labelPosition === "top" || labelPosition === "left");
const hasLabelAfter =
  showLabel && (labelPosition === "right" || labelPosition === "bottom");

const labelAttributes = $computed(
  () => ({
    class: setClass("input-label"),
    "data-label-position": labelPosition,
    "data-label-asterisk": showRequiredAsterisk,
  }),
  { onTrigger: console.warn }
);
const labelNode = () => showLabel && h("span", labelAttributes, props.label);

// Info control
const showHint = $computed(() => !!props.hint);
const showInfo = $computed(() => showErrorMessage || showHint);

// const render = () => {
//   const rootChildren = [];
//   const inputWrapperChildren = [];
//   const inputChildren = [];

//   const inputWrapperNode = h(
//     "div",
//     { class: setClass("input-wrapper") },
//     { default: () => inputWrapperChildren }
//   );
//   const inputNode = h(config.component, attributes, {
//     default: () => inputChildren,
//   });
//   const labelNode = showLabel && h("span", labelAttributes, props.label);

//   inputWrapperChildren.push(inputNode);
//   if (hasLabelBefore) rootChildren.push(labelNode);
//   rootChildren.push(inputWrapperNode);
//   if (hasLabelAfter) rootChildren.push(labelNode);

//   // info spacing
//   if (hasInfoSpacing)
//     rootChildren.push(
//       h(Transition, { name: setClass("input-info-spacing-transition") }, () =>
//         showInfo
//           ? h("div", { class: setClass("input-info-spacing") })
//           : undefined
//       )
//     );

//   // info hint
//   if (showHint)
//     rootChildren.push(
//       h("p", { class: setClass("input-info-hint") }, props.hint)
//     );

//   // info error
//   rootChildren.push(
//     h(Transition, { name: setClass("input-info-error-transition") }, () =>
//       showHint || showErrorMessage
//         ? h("p", { class: setClass("input-info-error") }, model.error)
//         : undefined
//     )
//   );

//   if (hasSelectOptions) {
//     const optionChildren = [];
//     if (attributes.placeholder)
//       optionChildren.push(
//         h(
//           "option",
//           { selected: !isSelected, disabled: true, hidden: true, value: "" },
//           attributes.placeholder
//         )
//       );
//     if (!isRequired && isSelected) optionChildren.push(h("option"));
//     optionChildren.push(
//       ...optionEntries.map(([key]) => h("option", { key, value: key }, key))
//     );
//     inputChildren.push(...optionChildren);
//   }

//   if (hasInputOptions) {
//     const datalistChildren = [];
//     const datalistNode = h("datalist", { id: datalistId }, datalistChildren);
//     datalistChildren.push(
//       ...optionEntries.map(([key]) => h("option", { key, value: key }))
//     );
//     inputWrapperChildren.push(datalistNode);
//   }

//   const rootNode = h(showLabel ? "label" : "div", rootChildren);
//   return rootNode;
// };
</script>

<template>
  <!-- <render /> -->
  <component :is="showLabel ? 'label' : 'div'">
    <labelNode v-if="hasLabelBefore" />
    <div :class="setClass('input-wrapper')">
      <!-- <flatPickr
        v-if="config.component === flatPickr"
        v-bind="attributes"
        v-model="model.value"
        @on-change="log"
      /> -->
      <component :is="config.component" v-bind="attributes">
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
      <datalist v-if="hasInputOptions" :id="datalistId">
        <option v-for="[key] in optionEntries" :key="key" :value="key"></option>
      </datalist>
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
  </component>
</template>

<style scoped lang="scss"></style>
