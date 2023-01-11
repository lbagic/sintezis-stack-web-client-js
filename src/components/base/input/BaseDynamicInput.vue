<script setup lang="ts">
import { dynamicInputProps, NDynamicInput } from "naive-ui";
import { ref } from "vue";
import InputValidation from "./FormItem.vue";
import { inputController as ctl } from "./inputController";

const inputRef = ref<any>(null);
const validationRef = ref<any>(null);
const props = defineProps({
  ...dynamicInputProps,
  ...ctl.props.base,
});
const emit = defineEmits(["update:modelValue"]);
defineExpose(inputRef);

const { model, context, formItemContext } = ctl.setup({
  emit,
  props,
  inputRef,
  validationRef,
});
</script>

<template>
  <InputValidation v-bind="formItemContext" ref="validationRef">
    <NDynamicInput v-bind="context" v-model:value="model.data" ref="inputRef">
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps || {}"></slot>
      </template>
    </NDynamicInput>
  </InputValidation>
</template>

<style scoped lang="scss"></style>
