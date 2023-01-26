<script setup lang="ts">
import { datePickerProps, NDatePicker } from "naive-ui";
import { ref } from "vue";
import InputValidation from "./FormItem.vue";
import { inputController as ctl } from "./inputController";

const inputRef = ref<InstanceType<typeof NDatePicker>>();
const validationRef = ref<any>();
const props = defineProps({
  ...datePickerProps,
  ...ctl.props.base,
});
const emit = defineEmits(["update:modelValue"]);
defineExpose({ input: inputRef });

const { model, context, formItemContext } = ctl.setup({
  emit,
  props,
  inputRef,
  validationRef,
});
</script>

<template>
  <InputValidation v-bind="formItemContext" ref="validationRef">
    <NDatePicker
      v-bind="context"
      v-model:value="model.data"
      ref="inputRef"
      style="width: 100%"
    >
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps || {}"></slot>
      </template>
    </NDatePicker>
  </InputValidation>
</template>

<style scoped lang="scss"></style>
