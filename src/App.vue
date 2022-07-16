<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <div class="snt-container-s">
        <p class="snt-fs-5">Yaay</p>
      </div>
      <button class="snt-button secondary small">asdf</button>
      <button class="snt-button secondary outline">asdf</button>
      <button class="snt-button secondary text large">asdf</button>
      <div class="snt-card warning">
        <table class="snt-table secondary">
          <thead>
            <tr>
              <th>a</th>
              <th>a</th>
              <th>a</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="num in 3" :key="num">
              <td>b{{ num }}</td>
              <td>b</td>
              <td>b</td>
            </tr>
          </tbody>
        </table>
      </div>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style lang="scss">
@import "@/assets/styles/index.scss";

body {
  background: #fff;
}
#app {
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100%;
}
</style>
