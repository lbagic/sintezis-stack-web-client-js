<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div>
    <button @click="router.push('/asdf')">click</button>
    <p>IndexView</p>
  </div>
</template>

<style scoped lang="scss"></style>
