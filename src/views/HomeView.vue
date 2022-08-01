<script setup>
import { toast } from "../components/base/toastCtl";
</script>

<template>
  <div class="snt-grid">
    <p class="qwe-qwe" data-type="success">HomeView</p>
    <button class="snt-button success" @click="toast.success('success')">
      success
    </button>
    <button class="snt-button danger" @click="toast.danger('danger')">
      danger
    </button>
    <button class="snt-button info" @click="toast.info('info')">info</button>
    <table></table>
  </div>
</template>

<style scoped lang="scss"></style>
