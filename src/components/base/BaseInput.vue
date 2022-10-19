<script>
import { useCssVar } from "@vueuse/core";
import { mergeProps, onMounted, useAttrs, watch } from "vue";
import { useFormData, _inputCtl } from "./input.ctl";

export default { inheritAttrs: false };

const { components, settings, inputValidation } = _inputCtl;
let _uid = 1;
</script>

<script setup>
const props = defineProps({
  modelValue: undefined,
  type: { type: String, default: "text" },
  hint: String,
  label: String,
  labelPlacement: String,
  validator: Function,
  options: undefined,
  useErrorBorder: { type: Boolean, default: settings.useErrorBorder },
  useErrorMessage: { type: Boolean, default: settings.useErrorMessage },
  useHtmlValidation: { type: Boolean, default: settings.useHtmlValidation },
  useRequiredAsterisk: { type: Boolean, default: settings.useRequiredAsterisk },
});
const config = components[props.type];
if (!config) throw new Error(`Input type "${props.type}" not supported.`);

const uid = _uid++;
const inputRef = $ref(null);
// const shadowRef = $ref(null);
const emit = defineEmits(["update:modelValue"]);
const attrs = useAttrs();
const prefix = useCssVar("--prefix");
const setClass = (className) =>
  prefix.value + "input" + (className ? className : "");
const labelPlacement =
  props.labelPlacement || config.labelPlacement || settings.labelPlacement;

const isDataModel = $ref(props.modelValue?._formDataModel);
const model = isDataModel
  ? props.modelValue
  : useFormData({ key: props.modelValue }).model.key;
let inputOptionModel = $ref("");

const options = $computed(() =>
  Array.isArray(props.options)
    ? Object.fromEntries(props.options.map((key) => [key, key]))
    : props.options
);
const flipOptions = $computed(() =>
  Object.fromEntries(Object.entries(options).map(([k, v]) => [v, k]))
);

const isRequired = attrs.required === "" || attrs.required === true;
const isSelected = $computed(
  () =>
    options &&
    Object.values(options).includes(model.value) &&
    model.value !== ""
);

const hasLabel = !!props.label;
const hasLabelBefore = hasLabel && ["top", "left"].includes(labelPlacement);
const hasLabelAfter = hasLabel && ["bottom", "right"].includes(labelPlacement);
const hasOptions = $computed(() => options && config.supportOptions);
const hasInputOptions = $computed(() => hasOptions && props.type !== "select");
const hasNoRadioValue = props.type === "radio" && !attrs.value;
const hasHint = !!props.hint;
const hasErrorShown = $computed(() => model.dirty && !model.valid);
const hasErrorMessageShow = $computed(
  () => props.useErrorMessage && hasErrorShown && !!model.error
);
const hasErrorBorderShown = $computed(
  () => props.useErrorBorder && hasErrorShown
);
const hasInfo = $computed(() => hasHint || hasErrorMessageShow);
const hasRequiredAsteriskShown = props.useRequiredAsterisk && isRequired;
const hasSelectPlaceholder = $computed(
  () => attrs.placeholder && props.type === "select" && !isSelected
);

function updateInputOptions(value) {
  if (value === "") return;
  const option = flipOptions[value];
  if (inputOptionModel !== option) inputOptionModel = option;
}

function validate(value) {
  inputValidation({ model, value, props, inputRef, attrs });
}

function onInvalid(event) {
  if (!props.useHtmlValidation) {
    event.preventDefault();
    let firstInvalidElement = event.target;
    const formElement = inputRef.closest("form");
    if (formElement)
      firstInvalidElement = [...formElement.elements].find(
        (element) => element.validity.valid === false
      );

    firstInvalidElement.parentNode.scrollIntoView({ behavior: "smooth" });
    firstInvalidElement.focus();
  }

  validate(model.value);
  model.dirty = true;
}

function onBlur() {
  model.dirty = true;
}

const attributes = $computed(() => {
  const baseAttrs = { class: setClass() };

  const defaultAttrs = {
    ref: "inputRef",
    class: {
      [setClass(`-${props.type}`)]: true,
      [setClass("--error")]: hasErrorShown,
      [setClass("--error-border")]: hasErrorBorderShown,
      [setClass("--picker-dropdown")]: hasOptions,
      [setClass("--placeholder")]: hasSelectPlaceholder,
    },
    onInvalid,
    onBlur,
  };
  if (hasInputOptions) defaultAttrs.list = `input-datalist-${uid}`;
  if (hasNoRadioValue) defaultAttrs.value = true;
  if (hasSelectPlaceholder) defaultAttrs["data-select-placeholder"] = true;

  if (config.shadow) defaultAttrs.readonly = true;

  const shadowAttrs = {
    ref: "shadowRef",
    class: setClass("-shadow"),
    tabindex: "-1",
  };

  return {
    default: mergeProps(baseAttrs, defaultAttrs, config.bind, attrs),
    shadow:
      config.shadow &&
      mergeProps(baseAttrs, shadowAttrs, config.shadow.bind, attrs),
  };
});
const labelAttributes = $computed(() => ({
  class: setClass("-label"),
  "data-label-placement": labelPlacement,
  "data-show-asterisk": hasRequiredAsteriskShown,
}));

watch(
  () => props.modelValue,
  (value) => {
    if (value === model.value) return;
    model.value = value;
    if (hasInputOptions) updateInputOptions(value);
  }
);
watch(
  () => model.value,
  (value) => {
    if (hasInputOptions) updateInputOptions(value);
    if (!props.type === "file") inputRef.value = value;
    validate(value);
    if (!isDataModel) emit("update:modelValue", value);
  }
);
if (hasInputOptions)
  watch(
    () => inputOptionModel,
    (raw) => {
      const value = options[raw] ?? "";
      if (!isDataModel) emit("update:modelValue", value);
      else model.value = value;
    }
  );

onMounted(() => {
  validate(model.value);
});
</script>

<template>
  <component :is="props.label ? 'label' : 'div'" :class="setClass('-root')">
    <!-- LABEL / top & left -->
    <span v-if="hasLabelBefore" v-bind="labelAttributes">
      {{ props.label }}
    </span>
    <!-- INPUTS -->
    <div style="position: relative; display: inline">
      <!-- input / default -->
      <input
        v-if="config.component === 'input' && !hasInputOptions"
        v-bind="attributes.default"
        v-model="model.value"
      />
      <!-- input / options -->
      <input
        v-if="config.component === 'input' && hasInputOptions"
        v-bind="attributes.default"
        v-model="inputOptionModel"
      />
      <datalist
        v-if="options && config.supportOptions && props.type !== 'select'"
        :id="`input-datalist-${uid}`"
      >
        <option
          v-for="(value, key) in options"
          :value="key"
          :key="key"
        ></option>
      </datalist>
      <!-- input / select -->
      <select
        v-if="config.component === 'select'"
        v-bind="attributes.default"
        v-model="model.value"
      >
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
        <option v-for="(value, key) in options" :value="value" :key="key">
          {{ key }}
        </option>
      </select>
      <!-- input / textarea -->
      <textarea
        v-if="config.component === 'textarea'"
        v-bind="attributes.default"
        v-model="model.value"
      >
      </textarea>
      <!-- input / shadow -->
      <input
        v-if="config.shadow && config.shadow.component === 'input'"
        v-bind="attributes.shadow"
        v-model="model.value"
      />
    </div>
    <!-- LABEL / bottom & right -->
    <span v-if="hasLabelAfter" v-bind="labelAttributes">
      {{ props.label }}
    </span>
    <!-- INFO / hint & error -->
    <Transition :name="setClass('-info-spacing-transition')">
      <div :class="setClass('-info-spacing')" v-if="hasInfo"></div>
    </Transition>
    <p :class="setClass('-info-hint')" v-if="hasHint">{{ hint }}</p>
    <Transition :name="setClass('-info-error-transition')">
      <p :class="setClass('-info-error')" v-if="hasErrorMessageShow">
        {{ model.error }}
      </p>
    </Transition>
  </component>
</template>

<style scoped lang="scss"></style>
