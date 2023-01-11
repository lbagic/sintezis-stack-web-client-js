<script setup lang="ts">
import { toastInternals } from "./toastController";
import type { Toast } from "./toast.types";

function onClick(toasts: Toast.Instance[], toast: Toast.Instance) {
  if (!toast.closable) return;
  const index = toasts.findIndex((el) => el === toast);
  if (index >= 0) toasts.splice(index, 1);
}
</script>

<template>
  <TransitionGroup
    v-for="(toasts, position) in toastInternals.data"
    :name="
      position.includes('top')
        ? `${$prefix}toast-transition-top`
        : `${$prefix}toast-transition-bottom`
    "
    tag="section"
    :class="`${$prefix}toast-wrapper`"
    :key="position"
    :data-position="position"
  >
    <output
      v-for="toast in toasts"
      role="status"
      :class="{
        [`${$prefix}toast`]: true,
        [`${$prefix}toast-closable`]: toast.closable,
        [`${$prefix}toast-type-${toast.type}`]: true,
      }"
      :key="toast.id"
      @click="onClick(toasts, toast)"
    >
      <p style="display: inline">{{ toast.message }}</p>
      <!-- <button :class="`${$prefix}close-icon`" aria-label="close"></button> -->
    </output>
  </TransitionGroup>
</template>

<style scoped lang="scss">
@import "./toasts.scss";
</style>
