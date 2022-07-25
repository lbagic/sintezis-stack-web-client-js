<script>
import { computed, reactive, useAttrs } from "vue";

export default {
  inheritAttrs: false,
};

/**
 * Generates reactive form data.
 *
 * @template T
 * @param {T} properties Decsripton.
 * @returns {{
 *   data: T;
 *   validation: Record<keyof T, boolean>;
 *   errors: Partial<Record<keyof T, string | null>>;
 *   model: Record<keyof T, {data: any, validation: boolean, errors: string | null}>
 *   isValid: boolean;
 * }}
 *   Return description.
 */

export function useFormData(properties) {
  const data = reactive(properties);
  const validation = reactive(
    Object.fromEntries(Object.keys(properties).map((key) => [key, false]))
  );
  const errors = reactive(
    Object.fromEntries(Object.keys(properties).map((key) => [key, null]))
  );
  const isValid = computed(() =>
    Object.values(validation).every((value) => value === true)
  );
  const model = Object.fromEntries(
    Object.keys(properties).map((key) => {
      return [
        key,
        {
          get data() {
            return data[key];
          },
          set data(value) {
            data[key] = value;
          },
          get validation() {
            return validation[key];
          },
          set validation(value) {
            validation[key] = value;
          },
          get errors() {
            return errors[key];
          },
          set errors(value) {
            errors[key] = value;
          },
        },
      ];
    })
  );
  return { data, validation, errors, isValid, model };
}

const baseInputConfig = {
  text: { component: "default-input" },
  email: { component: "default-input" },
  password: { component: "default-input" },
  search: { component: "default-input" },
  tel: { component: "default-input" },
  url: { component: "default-input" },
  color: { component: "default-input" },
  file: { component: "default-input" },
  number: { component: "number-input" },
  range: { component: "number-input" },
  checkbox: { component: "toggle-input", labelPlacement: "inline end" },
  radio: { component: "toggle-input", labelPlacement: "inline end" },
  textarea: { component: "textarea-input" },
  select: { component: "select-input" },
  "datetime-local": { component: "default-input" },
  date: { component: "default-input" },
  time: { component: "default-input" },
  month: { component: "default-input" },
};
</script>

<script setup>
const attrs = useAttrs();
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: Object,
  label: String,
  labelPlacement: String,
  type: String,
});

const type = props.type ?? "text";
const config = baseInputConfig[type];
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

const model = reactive(props.modelValue);
function onInput(value) {
  model.data = value;
  emit("update:modelValue", model);
}
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
      :data-required="isRequired"
      :data-label-placement="labelPlacement"
      >{{ label }}</span
    >
    <input
      v-if="config.component === 'default-input'"
      v-bind="$attrs"
      class="snt-input"
      :value="model.data"
      :type="type"
      :data-type="type"
      @input="onInput($event.target.value)"
    />
    <input
      v-if="config.component === 'number-input'"
      v-bind="$attrs"
      class="snt-input"
      :value="model.data"
      :type="type"
      :data-type="type"
      @input="onInput($event.target.valueAsNumber)"
    />
    <input
      v-if="config.component === 'toggle-input'"
      v-model="model.data"
      v-bind="$attrs"
      class="snt-input"
      :type="type"
      :data-type="type"
    />
    <textarea
      v-if="config.component === 'textarea-input'"
      v-bind="$attrs"
      class="snt-input"
      :value="model.data"
      :data-type="type"
      @input="onInput($event.target.value)"
    >
    </textarea>
    <select
      v-if="config.component === 'select-input'"
      v-bind="$attrs"
      class="snt-input"
      :value="model.data"
      :data-type="type"
      @input="onInput($event.target.value)"
    >
      <option value="1">opt 1</option>
      <option value="2">opt 2</option>
      <option value="3">opt 3</option>
    </select>
    <span
      v-if="label && labelPlacement.includes('end')"
      class="snt-input-label"
      :data-required="isRequired"
      :data-label-placement="labelPlacement"
      >{{ label }}</span
    >
  </component>
</template>

<style scoped lang="scss">
input:invalid {
  border: 1px solid red;
}
input:valid {
  border: 1px solid green;
}
</style>
