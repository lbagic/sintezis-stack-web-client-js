<script></script>

<script setup>
defineProps({
  infoSpacing: Boolean,
  hint: String,
  error: String,
  showError: Boolean,
});
</script>

<template>
  <div :class="`${$prefix}input-info`">
    <Transition
      :name="`${$prefix}input-info-spacing-transition`"
      v-if="infoSpacing"
    >
      <div
        v-if="hint || showError"
        :class="`${$prefix}input-info-spacing`"
      ></div>
    </Transition>
    <p v-if="hint" :class="`${$prefix}input-info-hint`">{{ hint }}</p>
    <Transition :name="`${$prefix}input-info-error-transition`">
      <p v-if="showError" :class="`${$prefix}input-info-error`">
        {{ error }}
      </p>
    </Transition>
  </div>
</template>

<style scoped lang="scss"></style>
