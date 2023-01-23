<script setup lang="ts">
import { NFormItem } from "naive-ui";
import { computed, ref, toRefs } from "vue";
import { inputValidation } from "./inputValidation";

const inputRef = ref(null);
const props = defineProps<{
  data?: any;
  formItem?: any;
  constraint?: any;
  onInvalidSubmit?: any;
}>();

const { data, formItem, onInvalidSubmit } = toRefs(props);
const constraint = computed(() =>
  inputValidation.patchConstraint(props.constraint)
);
defineExpose({ inputRef });
</script>

<template>
  <NFormItem v-bind="formItem">
    <input
      :value="data"
      @invalid="onInvalidSubmit"
      aria-hidden="true"
      autocomplete="off"
      class="hidden"
      ref="inputRef"
      tabindex="-1"
      type="text"
      v-bind="constraint"
    />
    <slot></slot>
  </NFormItem>
</template>

<style scoped lang="scss"></style>
