<script setup lang="ts">
import { modalProps, NModal } from "naive-ui";
import * as R from "ramda";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { modalInternals } from "./modalController";
import { setCssVar, css } from "@/utils/css";

const props = defineProps({
  ...modalProps,
  name: String,
  hash: String,
  query: String,
  maskColor: {
    type: String,
    default: css.colors.primary["opaque-soft"],
  },
});
const emit = defineEmits(["update:show"]);
const route = useRoute();
const router = useRouter();
const isShown = ref(!!props.show);
const { name, hash, query } = props;
const setMaskColor = () =>
  setCssVar("--n-modal-mask-background-override", props.maskColor);

watch(
  () => props.show,
  (value) => (isShown.value = value)
);
watch(isShown, (value) => {
  emit("update:show", value);
  if (value) setMaskColor();
});

function show() {
  isShown.value = true;
}
function hide() {
  isShown.value = false;
}

if (name) {
  onMounted(() => modalInternals.register(name, { show, hide }));
  onUnmounted(() => modalInternals.destroy(name));
}

if (hash || query) {
  watch(
    () => [route.hash, route.query],
    ([routeHash, routeQuery]) => {
      const isHashActive = !!hash && routeHash === hash;
      const isQueryActive = !!query && R.has(query, routeQuery);
      isShown.value = isHashActive || isQueryActive;
    },
    { immediate: true }
  );
  watch(isShown, (value) => {
    if (value) return;
    const updated = { hash: route.hash, query: { ...route.query } };
    if (hash === route.hash) updated.hash = "";
    if (query) delete updated.query[query];
    router.replace(updated);
  });
}
</script>

<template>
  <NModal v-bind="props" v-model:show="isShown" ref="modalRef">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}"></slot>
    </template>
  </NModal>
</template>

<style lang="scss"></style>
