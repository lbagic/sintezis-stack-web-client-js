<script setup lang="ts">
import { modalController } from "@/components/base/modal/modalController";
import ModalNext from "@/components/base/modal/BaseModal.vue";
import { reactive } from "vue";

const state = reactive({
  show: false,
});
</script>

<template>
  <ModalNext
    v-model:show="state.show"
    preset="card"
    hash="#hash"
    query="query"
    name="sampleModal"
    class="width-m"
  >
    <template #header>Header</template>
    <p>Content</p>
    <template #action>Action</template>
  </ModalNext>
  <a href="https://www.naiveui.com/en-US/light/components/modal"
    >Based off of NaiveUi modal</a
  >
  <div class="snt-flex">
    <button class="snt-button primary underline" @click="state.show = true">
      open programmatically
    </button>
    <button
      class="snt-button primary underline"
      @click="modalController.sampleModal.show"
    >
      open via modalController
    </button>
    <RouterLink to="#hash">open via hash</RouterLink>
    <RouterLink to="?query">open via query</RouterLink>
  </div>
</template>

<style scoped lang="scss"></style>
