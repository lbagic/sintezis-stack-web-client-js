<script setup lang="ts">
import { NRadio, radioProps } from "naive-ui";
import { ref } from "vue";
import InputValidation from "./FormItem.vue";
import { inputController as ctl } from "./inputController";

const inputRef = ref<any>(null);
const validationRef = ref<any>(null);
const props = defineProps({
  ...radioProps,
  ...ctl.props.base,
});
const emit = defineEmits(["update:modelValue"]);
defineExpose(inputRef);

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
    <NRadio
      v-bind="context"
      @update-checked="(value) => (model.data = value)"
      :checked="model.data"
      ref="inputRef"
    >
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps || {}"></slot>
      </template>
    </NRadio>
  </InputValidation>
</template>

<style scoped lang="scss"></style>
