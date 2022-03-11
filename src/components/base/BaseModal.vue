<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import {
  getCurrentInstance,
  onMounted,
  onUnmounted,
  ref,
  watchEffect,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { modalEscapeHandler } from "./modal.internal";
import { UseFocusTrap } from "@vueuse/integrations/useFocusTrap/component";

const { hash, query, open } = defineProps<{
  hash?: string;
  query?: string;
  open?: boolean;
}>();

const route = useRoute();
const router = useRouter();
const modal = ref<InstanceType<typeof HTMLElement> | null>(null);
let isOpen: boolean = $ref(false);
const uid = getCurrentInstance()?.uid as number;

onMounted(() => modalEscapeHandler.subscribe(uid, onKeydown));
onUnmounted(() => modalEscapeHandler.unsubscribe(uid));

watchEffect(() => {
  isOpen =
    open ||
    (hash && hash === route.hash) ||
    (query && query in route.query) ||
    false;
});

function onKeydown(event: KeyboardEvent) {
  if (event.code === "Escape") hide();
}

function show() {
  isOpen = true;
}
function hide() {
  isOpen = false;
  const urlParams: Record<string, unknown> = {};
  if (hash) urlParams.hash = "";
  if (query)
    urlParams.query = Object.entries(route.query).reduce(
      (a, [key, value]) => (key === query ? a : { ...a, [key]: value }),
      {}
    );
  router.replace(urlParams);
}

defineExpose({
  hide,
  show,
});
</script>

<template>
  <teleport to="body">
    <div
      class="base-modal-component-wrapper"
      :aria-hidden="!isOpen"
      v-if="isOpen"
      @keydown="onKeydown"
      ref="modal"
    >
      <UseFocusTrap v-if="isOpen">
        <div class="base-modal-component" :v-bind="$attrs" tabindex="0">
          <slot></slot>
        </div>
      </UseFocusTrap>
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
:global(.base-modal-component-wrapper) {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  &::backdrop {
    background: #f008;
  }
}
:global(.base-modal-component) {
  background: green;
  outline: none;
}
</style>
