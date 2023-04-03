<script setup lang="ts">
import { NTimePicker, timePickerProps } from "naive-ui";
import { ref } from "vue";
import InputValidation from "@/components/base/input/FormItem.vue";
import { inputController } from "@/components/base/input/inputController";

const inputRef = ref<InstanceType<typeof NTimePicker>>();
const validationRef = ref<any>();
const props = defineProps({
  ...timePickerProps,
  ...inputController.props.base,
});
const emit = defineEmits(["update:modelValue"]);
defineExpose({ input: inputRef });

const { model, context, formItemContext } = inputController.setup({
  emit,
  props,
  inputRef,
  validationRef,
});
</script>

<template>
  <InputValidation v-bind="formItemContext" ref="validationRef">
    <NTimePicker
      v-bind="context"
      v-model:value="model.data"
      ref="inputRef"
      style="width: 100%"
    >
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps || {}"></slot>
      </template>
    </NTimePicker>
  </InputValidation>
</template>

<style scoped lang="scss"></style>
