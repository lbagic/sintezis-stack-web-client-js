<script setup lang="ts">
import { NSlider, sliderProps } from "naive-ui";
import { ref } from "vue";
import InputValidation from "./FormItem.vue";
import { inputController as ctl } from "./inputController";

const inputRef = ref<InstanceType<typeof NSlider>>();
const validationRef = ref<any>();
const props = defineProps({
  ...sliderProps,
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
    <NSlider v-bind="context" v-model:value="model.data" ref="inputRef">
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps || {}"></slot>
      </template>
    </NSlider>
  </InputValidation>
</template>

<style scoped lang="scss"></style>
