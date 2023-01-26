<script setup lang="ts">
import { checkboxProps, NCheckbox } from "naive-ui";
import { ref } from "vue";
import InputValidation from "./FormItem.vue";
import { inputController as ctl } from "./inputController";

const inputRef = ref<InstanceType<typeof NCheckbox>>();
const validationRef = ref<any>();
const props = defineProps({
  ...checkboxProps,
  ...ctl.props.base,
});
const emit = defineEmits(["update:modelValue"]);
defineExpose({ input: inputRef });

const { model, context, formItemContext } = ctl.setup({
  emit,
  props,
  inputRef,
  validationRef,
  config: { ignoreLabel: true },
});
</script>

<template>
  <InputValidation v-bind="formItemContext" ref="validationRef">
    <NCheckbox
      v-bind="context"
      @update-checked="(value) => (model.data = value)"
      :checked="model.data"
      ref="inputRef"
    >
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps || {}"></slot>
      </template>
    </NCheckbox>
  </InputValidation>
</template>

<style scoped lang="scss"></style>
