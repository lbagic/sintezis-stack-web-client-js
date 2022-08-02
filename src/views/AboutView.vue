<script setup>
import BaseModal from "../components/base/BaseModal.vue";
</script>

<template>
  <div style="padding: 1rem">
    <p>AboutView</p>
    <p class="snt-close-icon small"></p>
    <p class="snt-close-icon"></p>
    <p class="snt-close-icon large"></p>
    <div class="container">
      <BaseModal fullscreen place-here class="primary">
        <p v-for="n in 100" :key="n">{{ n }} place-here fullscreen</p>
      </BaseModal>
    </div>
    <div class="container">
      <BaseModal place-here>
        <p v-for="n in 100" :key="n">{{ n }} place-here</p>
      </BaseModal>
    </div>
    <BaseModal>
      <p v-for="n in 5" :key="n">{{ n }} default</p>
    </BaseModal>
  </div>
</template>

<style scoped lang="scss">
.container {
  border: 1px solid black;
  height: 600px;
  width: 100%;
  position: relative;
}
</style>
