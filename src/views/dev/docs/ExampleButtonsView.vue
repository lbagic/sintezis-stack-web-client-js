<script setup lang="ts">
import { css } from "@/utils/css";

const colors = ["default", ...Object.keys(css.colors)];
const types = [
  "default",
  "secondary",
  "tertiary",
  "quaternary",
  "text",
  "text-active",
  "dashed",
  "outlined",
  "ghost",
];
</script>

<template>
  <div class="snt-container snt-grid small">
    <p class="bold">COLORS:</p>
    <div class="snt-flex-wrap tiny">
      <button v-for="color in colors" class="snt-button" :class="`${color}`">
        {{ color }}
      </button>
    </div>
    <p class="bold">SIZES:</p>
    <div class="snt-flex tiny">
      <button class="snt-button tiny">tiny</button>
      <button class="snt-button small">small</button>
      <button class="snt-button medium">medium</button>
      <button class="snt-button large">large</button>
    </div>
    <p class="bold">EXPAND:</p>
    <div>
      <button class="snt-button expand">expand</button>
    </div>
    <p class="bold">ROUND:</p>
    <div>
      <button class="snt-button round">round</button>
    </div>
    <p class="bold">UNDERLINE:</p>
    <div>
      <button class="snt-button underline">underline</button>
    </div>
    <p class="bold">TYPES:</p>
    <template v-for="t in types">
      <p>{{ t }}</p>
      <div class="snt-flex-wrap tiny">
        <button
          v-for="color in colors"
          class="snt-button"
          :class="`${color} ${t}`"
        >
          {{ color }}
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss"></style>
