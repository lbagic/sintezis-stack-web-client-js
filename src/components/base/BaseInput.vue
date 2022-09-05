<script>
import { useCssVar } from "@vueuse/core";
import { onMounted, reactive, useAttrs, watch } from "vue";
import { useFormData, _inputCtl } from "./input.ctl";

export default {
  inheritAttrs: false,
};

const { componentConfig, settings, htmlErrors, htmlErrorKeys } = _inputCtl;
</script>

<script setup>
const attrs = useAttrs();
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: undefined,
  type: String,
  hint: String,
  label: String,
  labelPlacement: String,
  validator: Function,
  useErrorBorder: { type: Boolean, default: settings.useErrorBorder },
  useErrorMessage: { type: Boolean, default: settings.useErrorMessage },
  useHtmlValidation: { type: Boolean, default: settings.useHtmlValidation },
  useRequiredAsterisk: {
    type: Boolean,
    default: settings.useRequiredAsterisk,
  },
});

const prefix = useCssVar("--prefix");
const model = reactive(
  props.modelValue?._formDataModel
    ? props.modelValue
    : useFormData({ value: props.modelValue }).model.value
);
const inputRef = $ref(null);
const type = $computed(() => props.type || "text");

const config = $computed(() => componentConfig[type]);
if (!config) throw new Error(`Input type "${type}" not supported.`);
const isRequired = $computed(() =>
  Object.prototype.hasOwnProperty.call(attrs, "required")
);

const labelPlacement = $computed(() => {
  const _placement = props.labelPlacement ?? config.labelPlacement ?? "";
  const placement = [];
  placement.push(_placement.includes("inline") ? "inline" : "block");
  placement.push(_placement.includes("end") ? "end" : "start");
  return placement.join(" ");
});

const showRequiredAsterisk = $computed(
  () => props.useRequiredAsterisk && isRequired
);

const showErrorMessage = $computed(
  () =>
    props.useErrorMessage &&
    model.isDirty &&
    !model.isValid &&
    !!model.errorMessage
);

const showErrorBorder = $computed(
  () => props.useErrorBorder && model.isDirty && !model.isValid
);
function runHtmlValidation() {
  const validity = inputRef.validity;
  const isValid = htmlErrorKeys.every((key) => !validity[key]);
  const state = { isValid, errorMessage: null };
  if (!state.isValid) {
    const errorKey = htmlErrorKeys.find((key) => validity[key] === true);
    const message = htmlErrors[errorKey].value;
    const parser = htmlErrors[errorKey].parser;
    state.errorMessage = parser ? parser(message, { attrs }) : message;
  }
  return state;
}

function runCustomValidation(value) {
  const validator = props.validator;
  const state = { isValid: true, errorMessage: null };
  if (!validator || typeof validator !== "function") return state;
  const output = validator(value);
  if (output === true) return state;
  state.isValid = false;
  if (typeof output === "string" && output.length) state.errorMessage = output;
  return state;
}

function runValidation(value) {
  const html = runHtmlValidation();
  const custom = runCustomValidation(value);
  const isValid = html.isValid && custom.isValid;
  const errorMessage = html.errorMessage || custom.errorMessage;
  if (props.useHtmlValidation) {
    if (!isValid && errorMessage) inputRef.setCustomValidity(errorMessage);
    else inputRef.setCustomValidity("");
  }

  model.isValid = isValid;
  model.errorMessage = errorMessage;

  return { isValid, errorMessage };
}

watch(
  () => model.value,
  (value) => {
    if (inputRef.value === value) return;
    inputRef.value = value;
    runValidation(value);
  }
);

function onInput(value) {
  model.value = value;
  runValidation(value);
  emit(
    "update:modelValue",
    props.modelValue?._formDataModel ? model : model.value
  );
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

  runValidation(model.value);
  model.isDirty = true;
}

function onBlur() {
  model.isDirty = true;
}

onMounted(() => {
  runValidation(model.value);
});
</script>

<template>
  <component
    :is="props.label ? 'label' : 'div'"
    :class="`${prefix}input-root`"
    :data-type="type"
    :data-label-placement="props.label && labelPlacement"
  >
    <span
      v-if="props.label && labelPlacement.includes('start')"
      :class="`${prefix}input-label`"
      :data-required-asterisk="showRequiredAsterisk"
      :data-label-placement="labelPlacement"
      >{{ props.label }}</span
    >
    <input
      v-if="config.component === 'default-input'"
      ref="inputRef"
      :class="`${prefix}input`"
      :value="model.value"
      :type="type"
      :data-type="type"
      :data-error-border="showErrorBorder"
      :data-valid="model.isValid"
      v-bind="$attrs"
      @input="onInput($event.target.value)"
      @invalid="onInvalid($event)"
      @blur="onBlur"
    />
    <input
      v-if="config.component === 'number-input'"
      ref="inputRef"
      :class="`${prefix}input`"
      :value="model.value"
      :type="type"
      :data-type="type"
      :data-error-border="showErrorBorder"
      :data-valid="model.isValid"
      v-bind="$attrs"
      @input="onInput($event.target.valueAsNumber)"
      @invalid="onInvalid($event)"
      @blur="onBlur"
    />
    <input
      v-if="config.component === 'toggle-input'"
      v-model="model.value"
      ref="inputRef"
      :class="`${prefix}input`"
      :type="type"
      :data-type="type"
      :data-error-border="showErrorBorder"
      :data-valid="model.isValid"
      v-bind="$attrs"
      @invalid="onInvalid($event)"
      @blur="onBlur"
    />
    <textarea
      v-if="config.component === 'textarea-input'"
      ref="inputRef"
      :class="`${prefix}input`"
      :value="model.value"
      :data-type="type"
      :data-error-border="showErrorBorder"
      :data-valid="model.isValid"
      v-bind="$attrs"
      @input="onInput($event.target.value)"
      @invalid="onInvalid($event)"
      @blur="onBlur"
    >
    </textarea>
    <select
      v-if="config.component === 'select-input'"
      :class="`${prefix}input`"
      ref="inputRef"
      :value="model.value"
      :data-type="type"
      :data-error-border="showErrorBorder"
      :data-valid="model.isValid"
      :data-has-placeholder="!!$attrs.placeholder"
      :data-has-value="model.value !== undefined && model.value !== null"
      v-bind="$attrs"
      @input="onInput($event.target.value)"
      @invalid="onInvalid($event)"
      @blur="onBlur"
    >
      <option v-if="$attrs.placeholder" value="" selected disabled hidden>
        {{ $attrs.placeholder }}
      </option>
      <option value="1">opt 1</option>
      <option value="2">opt 2</option>
      <option value="3">opt 3</option>
    </select>
    <span
      v-if="props.label && labelPlacement.includes('end')"
      :class="`${prefix}input-label`"
      :data-required-asterisk="showRequiredAsterisk"
      :data-label-placement="labelPlacement"
      >{{ props.label }}</span
    >
    <div
      :class="`${prefix}input-help-spacing`"
      :data-show="!!props.hint || showErrorMessage"
    ></div>
    <p :class="`${prefix}input-help`" data-hint v-if="props.hint">{{ hint }}</p>
    <Transition :name="`${prefix}input-help-transition`">
      <p
        :class="`${prefix}input-help`"
        data-error
        :data-show-error="showErrorMessage"
        v-if="showErrorMessage"
      >
        {{ model.errorMessage }}
      </p>
    </Transition>
  </component>
</template>

<style scoped lang="scss"></style>
