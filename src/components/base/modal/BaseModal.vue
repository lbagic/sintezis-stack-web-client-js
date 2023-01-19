<script setup lang="ts">
import { modalProps, NModal } from "naive-ui";
import * as R from "ramda";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
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
const router = useRouter();
const isShown = ref(!!props.show);
const { name, hash, query } = props;

setCssVar("--n-modal-mask-background-override", props.maskColor);

watch(
  () => props.show,
  (value) => (isShown.value = value)
);
watch(isShown, (value) => emit("update:show", value));

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
    () => [router.currentRoute.value.hash, router.currentRoute.value.query],
    ([routeHash, routeQuery]) => {
      if (isShown.value) return;
      isShown.value =
        (!!hash && routeHash === hash) || (!!query && R.has(query, routeQuery));
    },
    { immediate: true }
  );
  watch(isShown, () => {
    if (isShown.value) return;
    const route = R.clone(router.currentRoute.value);
    if (hash === route.hash) route.hash = "";
    if (query && R.has(query, route.query)) delete route.query[query];
    router.replace(route);
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
