<script setup lang="ts">
import { modalController } from "@/components/base/modal/modalController";
import ModalNext from "@/components/base/modal/BaseModal.vue";
// import { NModal } from "naive-ui";
import { reactive } from "vue";

const m = reactive({
  a: false,
  b: false,
});
</script>

<template>
  <pre>{{ m }}</pre>
  <button @click="m.a = true">open a</button>
  <button @click="modalController.a.show">programatic a</button>
  <RouterLink to="/test?asdf#hash">open via hash</RouterLink>
  <RouterLink to="?query&asdf">open via query</RouterLink>
  <!-- <button @click="m.b = true">open b</button> -->
  <ModalNext
    v-model:show="m.a"
    preset="card"
    hash="#hash"
    query="query"
    name="a"
  >
    <template #action>asdf</template>
  </ModalNext>
  <!-- <NModal v-model:show="m.b" preset="card">B</NModal> -->
</template>

<style scoped lang="scss"></style>
