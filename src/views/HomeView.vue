<script setup>
import BaseInput from "../components/base/BaseInput.vue";
</script>

<template>
  <div>
    <p>HomeView</p>
    <form @submit.prevent>
      <BaseInput label="qwe" min="23" required />
      <button type="submit" class="snt-button primary">submit</button>
    </form>
  </div>
</template>

<style scoped lang="scss"></style>
