<script>
import { useCssVar } from "@vueuse/core";
import { mergeProps, onMounted, useAttrs, watch } from "vue";
import { useFormData, _inputCtl } from "./input.ctl";

export default {
  inheritAttrs: false,
};

const { config: cfg, settings, runInputValidation } = _inputCtl;
</script>

<script setup>
const props = defineProps({
  modelValue: undefined,
  type: String,
  hint: String,
  label: String,
  labelPlacement: String,
  validator: Function,
  options: undefined,
  useErrorBorder: { type: Boolean, default: settings.useErrorBorder },
  useErrorMessage: { type: Boolean, default: settings.useErrorMessage },
  useHtmlValidation: { type: Boolean, default: settings.useHtmlValidation },
  useRequiredAsterisk: {
    type: Boolean,
    default: settings.useRequiredAsterisk,
  },
});

const attrs = useAttrs();
const emit = defineEmits(["update:modelValue"]);
const prefix = useCssVar("--prefix");
const inputRef = $ref(null);
const type = $computed(() => props.type || "text");
const config = $computed(() => cfg[type]);
if (!config) throw new Error(`Input type "${type}" not supported.`);
if (type === "radio" && !attrs.value)
  throw new Error(`Input type radio should have "value" property assigned.`);

const isDataModel = $ref(props.modelValue?._formDataModel);
const model = isDataModel
  ? props.modelValue
  : useFormData({ key: props.modelValue }).model.key;

const options = $computed(() =>
  Array.isArray(props.options)
    ? Object.fromEntries(props.options.map((key) => [key, key]))
    : props.options
);
const isSelected = $computed(
  () =>
    options &&
    Object.values(options).includes(model.value) &&
    model.value !== ""
);
const isRequired = $computed(
  () =>
    Object.prototype.hasOwnProperty.call(attrs, "required") &&
    attrs.required !== false
);
const labelPlacement = $computed(() => {
  const _placement =
    props.labelPlacement ?? config.labelPlacement ?? settings.labelPlacement;
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
const componentAttributes = $computed(() => {
  const attributes = mergeProps(attrs, {
    ref: "inputRef",
    class: `${prefix.value}input`,
    type,
    "data-type": type,
    "data-error-border": showErrorBorder,
    "data-valid": model.isValid,
    onBlur,
    onInvalid,
  });
  if (type === "select")
    Object.assign(attributes, {
      "data-has-placeholder": !!attrs.placeholder,
      "data-has-value": isSelected,
    });

  return attributes;
});

function runValidation(value) {
  runInputValidation({ model, value, props, inputRef, attrs });
}

watch(
  () => props.modelValue,
  (value) => value !== model.value && (model.value = value)
);
watch(
  () => model.value,
  (value) => {
    inputRef.value = value;
    runValidation(value);
    if (!isDataModel) emit("update:modelValue", value);
  }
);

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
      v-bind="componentAttributes"
      v-model="model.value"
    />
    <input
      v-if="config.component === 'number-input'"
      v-bind="componentAttributes"
      v-model="model.value"
    />
    <input
      v-if="config.component === 'toggle-input'"
      v-bind="componentAttributes"
      v-model="model.value"
    />
    <textarea
      v-if="config.component === 'textarea-input'"
      v-bind="componentAttributes"
      v-model="model.value"
    >
    </textarea>
    <select
      v-if="config.component === 'select-input'"
      v-bind="componentAttributes"
      v-model="model.value"
    >
      <option
        v-if="$attrs.placeholder"
        :selected="!isSelected"
        disabled
        hidden
        value=""
      >
        {{ $attrs.placeholder }}
      </option>
      <option v-if="!isRequired && isSelected"></option>
      <option v-for="(value, key) in options" :value="value" :key="key">
        {{ key }}
      </option>
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
