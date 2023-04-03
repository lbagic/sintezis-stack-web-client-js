<script setup lang="ts">
import { NUpload, uploadProps } from "naive-ui";
import { ref } from "vue";
import InputValidation from "@/components/base/input/FormItem.vue";
import { inputController } from "@/components/base/input/inputController";

const inputRef = ref<InstanceType<typeof NUpload>>();
const validationRef = ref<any>();
const props = defineProps({
  ...uploadProps,
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
    <NUpload
      v-bind="context"
      @update-file-list="(value) => (model.data = value)"
      ref="inputRef"
    >
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps || {}"></slot>
      </template>
    </NUpload>
  </InputValidation>
</template>

<style scoped lang="scss"></style>
