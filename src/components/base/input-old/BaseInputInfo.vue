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

<style scoped lang="scss">
.#{$prefix}input-info {
  --info-line-height: 1.25;
  --info-font-size: 12px;
  --info-max-height: calc(var(--info-line-height) * var(--info-font-size));
}
.#{$prefix}input-info-spacing {
  height: 3px;
  &-transition {
    @include transition(all 0.3s ease) {
      height: 0px;
    }
  }
}
.#{$prefix}input-info-hint,
.#{$prefix}input-info-error {
  line-height: var(--info-line-height);
  font-size: var(--info-font-size);
  margin-left: 4px;
}
.#{$prefix}input-info-hint {
  color: var(--#{$prefix}color-grey);
}
.#{$prefix}input-info-error {
  color: var(--#{$prefix}color-error);
  &-transition {
    &-enter-active,
    &-leave-active {
      transition: all 0.3s var(--#{$prefix}bezier-1);
    }
    &-enter-from,
    &-leave-to {
      transform: translateY(-3px);
      opacity: 0;
      max-height: 0px;
    }
    &-leave-from,
    &-enter-to {
      max-height: var(--info-max-height);
    }
  }
}
</style>
