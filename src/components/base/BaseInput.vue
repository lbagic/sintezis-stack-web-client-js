<script>
import { computed, onMounted, reactive, useAttrs, watch } from "vue";
import { _inputCtl } from "./inputCtl";

// # BaseInput roadmap

// | BaseInput                                    | status ✅ |
// | -------------------------------------------- | --------- |
// | different input type support                 |           |
// | validation                                   |           |
// | error & help text support                    |           |
// | label support                                |           |
// | icon support                                 |           |
// | default input types                          |           |
// | extendable styling                           |           |
// | `date`, `time`, `month` support              |           |
// | `date range` support                         |           |
// | `textarea`, `select` support                 |           |
// | `checkbox`, `radio` support                  |           |
// | `file input` support                         |           |
// | `@invalid` lazy validation when form submits |           |

// todo: placeholder, options

export default {
  inheritAttrs: false,
};

function useUndefinedProp(prop, setting) {
  if (prop === undefined) return setting;
  if (typeof prop === "string") return false;
  if (typeof prop === "boolean") return prop;
  return false;
}
</script>

<script setup>
const { componentConfig, settings, htmlErrors, htmlErrorKeys } = _inputCtl;
const attrs = useAttrs();
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: Object,
  label: String,
  hint: String,
  labelPlacement: String,
  type: String,
  validator: Function,
  hideErrors: undefined,
  hideHtmlValidation: undefined,
  hideRequiredAsterisk: undefined,
  hideErrorBorder: undefined,
});

const model = reactive(props.modelValue);
const inputRef = $ref(null);
const type = props.type ?? "text";

const config = componentConfig[type];
if (!config) throw new Error(`Input type "${type}" not supported.`);
const isRequired = Object.prototype.hasOwnProperty.call(attrs, "required");
const label = $ref(props.label);
const labelPlacement = (() => {
  const _placement = props.labelPlacement ?? config.labelPlacement ?? "";
  const placement = [];
  placement.push(_placement.includes("inline") ? "inline" : "block");
  placement.push(_placement.includes("end") ? "end" : "start");
  return placement.join(" ");
})();

const useHtmlValidation = useUndefinedProp(
  props.hideHtmlValidation,
  settings.useHtmlValidation
);
const useRequiredAsterisk = useUndefinedProp(
  props.hideRequiredAsterisk,
  settings.useRequiredAsterisk
);
const showRequiredAsterisk = useRequiredAsterisk && isRequired;

const useErrors = useUndefinedProp(props.hideErrors, settings.useErrors);
const showError = computed(
  () => useErrors && model.isDirty && !model.isValid && !!model.errorMessage
);

const useErrorBorder = useUndefinedProp(
  props.useErrorBorder,
  settings.useErrorBorder
);
const showErrorBorder = computed(
  () => useErrorBorder && model.isDirty && !model.isValid
);

function runHtmlValidation() {
  const validity = inputRef.validity;
  const isValid = htmlErrorKeys.every((key) => !validity[key]);
  const state = { isValid, errorMessage: null };
  if (!state.isValid) {
    const errorKey = htmlErrorKeys.find((key) => validity[key] === true);
    state.errorMessage = htmlErrors[errorKey];
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
  if (useHtmlValidation) {
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
    console.log("onExternal");
    inputRef.value = value;
    runValidation(value);
  }
);

function onInput(value) {
  console.log("onInternal");
  model.value = value;
  runValidation(value);
  emit("update:modelValue", model);
}

function onInvalid(event) {
  if (!useHtmlValidation) {
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
    :is="label ? 'label' : 'div'"
    class="snt-input-root"
    :data-type="type"
    :data-label-placement="label && labelPlacement"
  >
    <span
      v-if="label && labelPlacement.includes('start')"
      class="snt-input-label"
      :data-required-asterisk="showRequiredAsterisk"
      :data-label-placement="labelPlacement"
      >{{ label }}</span
    >
    <input
      v-if="config.component === 'default-input'"
      v-bind="$attrs"
      ref="inputRef"
      class="snt-input"
      :value="model.value"
      :type="type"
      :data-type="type"
      :data-error-border="showErrorBorder"
      :data-valid="model.isValid"
      @input="onInput($event.target.value)"
      @invalid="onInvalid($event)"
      @blur="onBlur"
    />
    <input
      v-if="config.component === 'number-input'"
      v-bind="$attrs"
      ref="inputRef"
      class="snt-input"
      :value="model.value"
      :type="type"
      :data-type="type"
      :data-error-border="showErrorBorder"
      :data-valid="model.isValid"
      @input="onInput($event.target.valueAsNumber)"
      @invalid="onInvalid($event)"
      @blur="onBlur"
    />
    <input
      v-if="config.component === 'toggle-input'"
      v-model="model.value"
      v-bind="$attrs"
      ref="inputRef"
      class="snt-input"
      :type="type"
      :data-type="type"
      :data-error-border="showErrorBorder"
      :data-valid="model.isValid"
      @invalid="onInvalid($event)"
      @blur="onBlur"
    />
    <textarea
      v-if="config.component === 'textarea-input'"
      v-bind="$attrs"
      ref="inputRef"
      class="snt-input"
      :value="model.value"
      :data-type="type"
      :data-error-border="showErrorBorder"
      :data-valid="model.isValid"
      @input="onInput($event.target.value)"
      @invalid="onInvalid($event)"
      @blur="onBlur"
    >
    </textarea>
    <select
      v-if="config.component === 'select-input'"
      v-bind="$attrs"
      class="snt-input"
      ref="inputRef"
      :value="model.value"
      :data-type="type"
      :data-error-border="showErrorBorder"
      :data-valid="model.isValid"
      :data-has-placeholder="!!$attrs.placeholder"
      :data-has-value="model.value !== undefined && model.value !== null"
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
      v-if="label && labelPlacement.includes('end')"
      class="snt-input-label"
      :data-required-asterisk="showRequiredAsterisk"
      :data-label-placement="labelPlacement"
      >{{ label }}</span
    >
    <div
      class="snt-input-help-spacing"
      :data-show="!!props.hint || showError"
    ></div>
    <p class="snt-input-help" data-hint v-if="props.hint">{{ hint }}</p>
    <Transition name="snt-input-help-transition">
      <p
        class="snt-input-help"
        data-error
        :data-show-error="showError"
        v-if="showError"
      >
        {{ model.errorMessage }}
      </p>
    </Transition>
  </component>
</template>

<style scoped lang="scss"></style>
