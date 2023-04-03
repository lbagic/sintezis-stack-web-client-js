<script setup lang="ts">
import { mentionProps, NMention } from "naive-ui";
import { ref } from "vue";
import InputValidation from "@/components/base/input/FormItem.vue";
import { inputController } from "@/components/base/input/inputController";

const inputRef = ref<InstanceType<typeof NMention>>();
const validationRef = ref<any>();
const props = defineProps({
  ...mentionProps,
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
    <NMention v-bind="context" v-model:value="model.data" ref="inputRef">
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps || {}"></slot>
      </template>
    </NMention>
  </InputValidation>
</template>

<style scoped lang="scss"></style>
