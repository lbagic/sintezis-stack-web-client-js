<script setup lang="ts"></script>

<template>
  <div class="snt-container large">
    <header>
      <h1 class="title">{{ $applicationTitle }}</h1>
    </header>
    <main style="margin-top: 2rem; margin-left: 2rem">
      <RouterView></RouterView>
    </main>
  </div>
</template>

<style scoped lang="scss"></style>
