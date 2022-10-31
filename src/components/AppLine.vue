<template>
  <div class="app-line" :data-type="type" :data-direction="direction"></div>
</template>

<script setup>
defineProps({
  direction: { type: String, default: "horizontal" },
  type: { type: String, default: "solid" },
});
</script>

<style scoped lang="scss">
.app-line[data-type="solid"],
.app-line[data-type="dashed"] {
  &[data-direction="horizontal"] {
    border-bottom: 1px v-bind(type) currentColor;
    width: 100%;
  }
  &[data-direction="vertical"] {
    border-right: 1px v-bind(type) currentColor;
    margin-left: -1px;
    width: 1px;
    height: 100%;
  }
}
.app-line[data-type="dotted"] {
  background-color: currentColor;
  --size: 2px;
  --spread: 12px;
  mask-repeat: round;
  mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='2'/%3E%3C/svg%3E");
  &[data-direction="horizontal"] {
    mask-size: var(--spread) var(--size);
    height: var(--size);
    width: 100%;
  }
  &[data-direction="vertical"] {
    mask-size: var(--size) var(--spread);
    height: 100%;
    width: var(--size);
  }
}
</style>
