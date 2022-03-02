<script setup lang="ts"></script>

<template>
  <teleport to="body">
    <!-- <div class="base-modal-component-wrapper"></div> -->
    <dialog class="base-modal-component" v-bind="$attrs">
      <p>Dialog</p>
    </dialog>
  </teleport>
</template>

<style lang="scss" scoped>
:global(.base-modal-component-wrapper) {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
:global(.base-modal-component) {
  background: green;
}
</style>
