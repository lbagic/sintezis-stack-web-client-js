<script setup lang="ts">
import { dynamicTagsProps, NDynamicTags } from "naive-ui";
import { ref } from "vue";
import InputValidation from "./FormItem.vue";
import { inputController as ctl } from "./inputController";

const inputRef = ref<any>(null);
const validationRef = ref<any>(null);
const props = defineProps({
  ...dynamicTagsProps,
  ...ctl.props.base,
});
const emit = defineEmits(["update:modelValue"]);
defineExpose(inputRef);

const { model, context, formItemContext } = ctl.setup({
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
