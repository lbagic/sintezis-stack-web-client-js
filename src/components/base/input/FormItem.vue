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
      type="text"
      tabindex="-1"
      ref="inputRef"
      :value="data"
      v-bind="constraint"
      class="hidden"
      @invalid="onInvalidSubmit"
    />
    <slot></slot>
  </NFormItem>
</template>

<style scoped lang="scss"></style>
