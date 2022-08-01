<script setup>
import { _toastCtl } from "./toastCtl.js";

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
        ? 'snt-toast-transition-top'
        : 'snt-toast-transition-bottom'
    "
    tag="div"
    class="snt-toast-wrapper"
    :key="position"
    :data-position="position"
  >
    <div
      v-for="toast in toasts"
      class="snt-toast"
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
