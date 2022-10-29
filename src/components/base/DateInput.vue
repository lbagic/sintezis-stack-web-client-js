<script>
const allowedEvents = [
  "onChange",
  "onOpen",
  "onClose",
  "onMonthChange",
  "onYearChange",
  "onDayCreate",
];

/** @param { import("flatpickr/dist/types/options").Options } flatpickrConfig */
function createConfig(flatpickrConfig) {
  const eventEntries = [];
  const config = flatpickrConfig ? { ...flatpickrConfig } : {};
  allowedEvents.forEach((key) => {
    const handler = config[key];
    if (!handler) return;
    eventEntries.push([key, handler]);
    delete config[key];
  });
  return { config, eventEntries };
}
</script>

<script setup>
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { onMounted, onUnmounted, reactive, useAttrs, watch } from "vue";

const emit = defineEmits(["update:modelValue", "input", "blur"]);
const attrs = useAttrs();
const props = defineProps({
  config: undefined,
  modelValue: [String, Date],
});

/** @type { flatpickr.Instance } */
let fp = $ref(undefined);
const inputRef = $ref(null);
let wasFocused = $ref(false);
let isFocused = $ref(false);
let isOpen = $ref(false);
const emitBlur = $computed(() => !isOpen && !isFocused && wasFocused);

const model = reactive({
  value: props.config?.defaultDate || "",
  date: "",
});

function onChange(dates, dateString) {
  const mode = props.config?.mode || "single";
  model.date = mode === "single" ? dates[0] : dates;
  model.value = dateString;
}

function createInstance() {
  if (fp) fp.destroy();
  const { config, eventEntries } = createConfig(props.config);
  fp = flatpickr(inputRef, config);
  if (!props.config?.allowInput) fp.input.readOnly = false;
  fp.config.onChange.push(onChange);
  fp.config.onOpen.push(() => (isOpen = true));
  fp.config.onClose.push(() => (isOpen = false));
  eventEntries.forEach(([name, handler]) => fp.config[name].push(handler));
  if (model.date) fp.setDate(model.date, true);
}
function onInput(e) {
  e.preventDefault();
  e.target.value = "";
}
function onFocus() {
  if (!props.config?.allowInput) fp.input.readOnly = true;
  isFocused = wasFocused = true;
}
function onComponentBlur() {
  emit("blur");
}
function onInternalChange(value) {
  emit("update:modelValue", value);
  emit("input", { target: { value } });
}
function onExternalChange(value) {
  if (value === model.value) return;
  fp.setDate(value);
  onChange(fp.selectedDates, value);
}
function onDestroy() {
  fp.destroy();
}
onMounted(() => {
  createInstance();
  watch(() => model.value, onInternalChange);
  watch(() => props.modelValue, onExternalChange, { immediate: true });
  watch(() => emitBlur, onComponentBlur);
  watch(() => props.config, createInstance, { deep: true });
});
onUnmounted(onDestroy);
</script>

<template>
  <input
    type="text"
    ref="inputRef"
    :value="model.value"
    :style="{
      caretColor: props.config?.allowInput ? 'initial' : 'transparent',
    }"
    v-bind="attrs"
    @input="onInput"
    @focus="onFocus"
    @blur="isFocused = false"
  />
</template>

<style scoped lang="scss"></style>
