<template>
  <div
    style="
      display: grid;
      grid-template-columns: repeat(2, auto);
      align-items: center;
    "
  >
    <button @click="list.push('item')">Add item</button>
    <ul>
      <li v-for="(item, index) in list" :key="item">{{ item + index }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const list = $ref(Array(2).fill("item"));
</script>

<style scoped></style>
