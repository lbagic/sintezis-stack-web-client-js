<script setup>
import { _toastCtl } from "./toastCtl.js";

const data = _toastCtl.data;
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
    >
      {{ toast.message }}
    </div>
  </TransitionGroup>
</template>

<style scoped lang="scss"></style>
