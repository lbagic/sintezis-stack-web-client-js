<script setup>
import { toast } from "../components/base/BaseToast.vue";
</script>

<template>
  <div class="snt-grid">
    <p class="qwe-qwe" data-type="success">HomeView</p>
    <button class="snt-button success" @click="toast.success('success')">
      success
    </button>
    <button class="snt-button danger" @click="toast.error('error')">
      error
    </button>
    <button class="snt-button grey" @click="toast.info('info')">info</button>
    <table></table>
  </div>
</template>

<style scoped lang="scss"></style>
