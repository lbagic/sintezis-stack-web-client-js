<script setup>
import { useCssVar } from "@vueuse/core";
import { _toastCtl } from "./toastCtl.js";

const prefix = useCssVar("--prefix");

const data = _toastCtl.data;

function onClick(event, list, toast) {
  if (!toast.closable) return;
  const itemIndex = list.findIndex((el) => el === toast);
  if (itemIndex >= 0) list.splice(itemIndex, 1);
}
</script>

<template>
  <TransitionGroup
    v-for="(toasts, position) in data"
    :name="
      position.includes('top')
        ? `${prefix}toast-transition-top`
        : `${prefix}toast-transition-bottom`
    "
    tag="div"
    :class="`${prefix}toast-wrapper`"
    :key="position"
    :data-position="position"
  >
    <div
      v-for="toast in toasts"
      :class="`${prefix}toast`"
      :key="toast.id"
      :data-type="toast.type"
      :data-closable="toast.closable"
      @click="onClick($event, toasts, toast)"
    >
      {{ toast.message }}
    </div>
  </TransitionGroup>
</template>

<style scoped lang="scss"></style>
