<script setup>
import BaseModal from "../components/base/BaseModal.vue";
import { modals } from "../components/base/modal.ctl";
</script>

<template>
  <div
    style="padding: 1rem; display: grid; gap: 1rem; align-content: flex-start"
  >
    <p>AboutView</p>

    <div class="container">
      <p>Container with stuff inside</p>
      <p>Modal will open over the component</p>
      <button
        class="snt-button primary"
        @click="modals.fullscreen_local.open()"
      >
        open local fullscreen modal
      </button>
      <BaseModal fullscreen place-here name="fullscreen_local">
        <button class="snt-button primary">asdf</button>
        <input type="text" value="<input autofocus />" autofocus />
        <button class="snt-button primary">asdf</button>
        <p v-for="n in 100" :key="n">{{ n }} place-here fullscreen</p>
      </BaseModal>
    </div>

    <div class="container">
      <p>Container with stuff inside</p>
      <p>Modal will open over the component</p>
      <button class="snt-button danger" @click="modals.local.open()">
        open local modal
      </button>
      <BaseModal place-here name="local" class="danger">
        <input type="text" />
        <button class="snt-button primary" autofocus>
          {{'<button autofocus />'}}
        </button>
        <button class="snt-button primary">asdf</button>
        <p v-for="n in 100" :key="n">{{ n }} place-here</p>
      </BaseModal>
    </div>

    <BaseModal name="default">
      <input type="text" value="<input autofocus />" autofocus />
      <button class="snt-button primary">asdf</button>
      <button class="snt-button primary">asdf</button>
      <p v-for="n in 100" :key="n">{{ n }} place-here</p>
    </BaseModal>
    <BaseModal fullscreen name="fullscreen">
      <input type="text" />
      <button class="snt-button primary">asdf</button>
      <button class="snt-button primary">asdf</button>
      <p v-for="n in 100" :key="n">{{ n }} place-here</p>
    </BaseModal>

    <button class="snt-button grey" @click="modals.default.open()">
      open default modal
    </button>
    <button class="snt-button secondary" @click="modals.fullscreen.open()">
      open fullscreen modal
    </button>
  </div>
</template>

<style scoped lang="scss">
.container {
  border: 1px solid black;
  height: 400px;
  width: 100%;
  position: relative;
}
</style>
