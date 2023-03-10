<script setup lang="ts">
import { setCssVar } from "@/utils/css";
import { NModal } from "naive-ui";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { baseModalProps, modalInternals } from "./modalController";

const props = defineProps(baseModalProps);
const emit = defineEmits(["update:show", "modalShow", "modalHide"]);
const route = useRoute();
const router = useRouter();
const { name, hash, query } = props;

const isShown = ref(!!props.show);

const show = () => (isShown.value = true);
const hide = () => (isShown.value = false);
const setMaskColor = () =>
  setCssVar("--n-modal-mask-background-override", props.maskColor);

watch(
  () => props.show,
  (value) => (isShown.value = value)
);
watch(isShown, (value) => {
  emit("update:show", value);
  emit(value ? "modalShow" : "modalHide");
  if (value) setMaskColor();
});

const isControlledByName = !!name;
if (isControlledByName) {
  onMounted(() => modalInternals.register(name, { show, hide }));
  onUnmounted(() => modalInternals.destroy(name));
}

const isControlledByRoute = !!hash || !!query;
if (isControlledByRoute) {
  const isHashActive = computed(() => {
    return !!hash && route.hash === hash;
  });
  const isQueryActive = computed(() => {
    return !!query && Object.hasOwn(route.query, query);
  });
  const isActive = computed(() => isHashActive.value || isQueryActive.value);
  watch(isActive, (value) => (isShown.value = value), { immediate: true });
  watch(isShown, (value) => {
    if (value) return;
    const updated = { hash: route.hash, query: { ...route.query } };
    if (isHashActive.value) hash && (updated.hash = "");
    if (isQueryActive.value) query && delete updated.query[query];
    router[props.routerAction](updated);
  });
}

defineExpose({ show, hide });
</script>

<template>
  <NModal v-bind="props" v-model:show="isShown">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}"></slot>
    </template>
  </NModal>
</template>

<style lang="scss"></style>
