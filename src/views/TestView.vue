<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore";

const userStore = useUserStore();

function add() {
  userStore.usersAdd({ id: 5, type: "asdf" });
}
function find() {
  console.log(userStore.usersFindOne({ type: "even" }));
}
function findAll() {
  console.log(userStore.usersFindMany({ type: "even" }));
}
function remove() {
  userStore.usersRemove({ type: "odd" });
}
function reset() {
  userStore.usersReset();
}
</script>

<template>
  <div style="display: grid; gap: 0.5rem; grid-template-columns: 1fr 1fr">
    <div style="display: grid">
      <button @click="add">add</button>
      <button @click="find">find</button>
      <button @click="findAll">findAll</button>
      <button @click="remove">remove</button>
      <button @click="reset">reset</button>
    </div>
    <pre>{{ userStore.users }}</pre>
  </div>
</template>

<style lang="scss" scoped>
//
</style>
