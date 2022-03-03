<script setup lang="ts">
import { watch } from "vue";
import { useRoute } from "vue-router";

const { hash, query, open } = defineProps<{
  hash?: string;
  query?: string;
  open?: boolean;
}>();

const dialogAttrs: { open?: boolean } = {};
const route = useRoute();
const openMethod = hash ? "hash" : query ? "query" : "flag";
const routeProps = { hash, query };

if (openMethod !== "flag") {
  watch(
    () => route[openMethod],
    (value) => {
      if (routeProps[openMethod] === value) dialogAttrs.open = true;
    }
  );
}
console.log(dialogAttrs);
</script>

<template>
  <teleport to="body">
    <dialog class="base-modal-component-wrapper" v-bind="dialogAttrs">
      <div class="base-modal-component" :v-bind="$attrs">
        <p>Dialog</p>
      </div>
    </dialog>
  </teleport>
</template>

<style lang="scss" scoped>
:global(.base-modal-component-wrapper) {
  // position: fixed;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // top: 0;
  // left: 0;
  // width: 100%;
  // height: 100%;
}
:global(.base-modal-component) {
  background: green;
}
</style>
