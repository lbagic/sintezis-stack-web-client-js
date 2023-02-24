<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  count: number;
  current: number;
  useIndex?: boolean;
  center?: boolean;
}>();

const index = computed(() =>
  props.useIndex ? props.current : props.current - 1
);
const cssDisplay = computed(() => (index.value >= 0 ? "initial" : "none"));
const cssJustifyContent = computed(() => (props.center ? "center" : "unset"));
</script>

<template>
  <div class="stepper-wrapper">
    <div class="stepper">
      <div v-for="step in count" class="stepper__bar" :key="step"></div>
      <div class="stepper__bar stepper__bar--active"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.stepper-wrapper {
  display: flex;
  justify-content: v-bind(cssJustifyContent);
}
.stepper {
  --step-gap: 1rem;
  --step-width: 44px;
  --step-height: 8px;
  --step-color: var(--snt-color-muted);

  display: grid;
  grid-template-columns: repeat(v-bind(count), var(--step-width));
  gap: var(--step-gap);
  position: relative;
}
.stepper__bar {
  width: var(--step-width);
  height: var(--step-height);
  border-radius: calc(var(--step-height) / 2);
  background: var(--step-color);
}
.stepper__bar--active {
  --step-color: var(--snt-color-accent);
  --offset-size: calc(var(--step-width) + var(--step-gap));
  --offset: calc(v-bind(index) * var(--offset-size));

  display: v-bind(cssDisplay);
  position: absolute;
  left: 0;
  top: 0;
  transition: transform 0.3s ease, display 0.3s ease;
  transform: translateX(max(0px, var(--offset)));
}
</style>
