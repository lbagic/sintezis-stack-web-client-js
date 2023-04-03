<script setup lang="ts">
import { dynamicTagsProps, NDynamicTags } from "naive-ui";
import { ref } from "vue";
import InputValidation from "@/components/base/input/FormItem.vue";
import { inputController } from "@/components/base/input/inputController";

const inputRef = ref<InstanceType<typeof NDynamicTags>>();
const validationRef = ref<any>();
const props = defineProps({
  ...dynamicTagsProps,
  ...inputController.props.base,
});
const emit = defineEmits(["update:modelValue"]);
defineExpose({ input: inputRef });

const { model, context, formItemContext } = inputController.setup({
  emit,
  props,
  inputRef,
  validationRef,
  config: { preventSubmit: true },
});

// let isComponentFocused = false;
// const overflow = document.body.style.overflow;
// function onEnter() {
//   document.body.style.overflow = "hidden";
//   setTimeout(() => {
//     document.body.style.overflow = overflow;
//   }, 10);
// }
// function onVnodeUpdate(node: any) {
//   if (isComponentFocused) node.el?.querySelector("button:last-child").focus();
//   isComponentFocused = false;
// }
</script>

<template ref="qwe">
  <InputValidation v-bind="formItemContext" ref="validationRef">
    <NDynamicTags ref="inputRef" v-bind="context" v-model:value="model.data">
      <!-- @keydown="isComponentFocused = true"
      @vnode-updated="onVnodeUpdate"
      @keydown.enter="onEnter" -->
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps || {}"></slot>
      </template>
    </NDynamicTags>
  </InputValidation>
</template>

<style scoped lang="scss"></style>
