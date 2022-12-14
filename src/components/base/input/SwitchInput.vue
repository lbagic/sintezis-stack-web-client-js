<script>
export default { inheritAttrs: false };
</script>

<script setup>
import { useAttrs } from "vue";

const emit = defineEmits(["input", "blur", "invalid"]);
const attrs = useAttrs();
const inputRef = $ref(null);

function onInput(e) {
  emit("input", e);
}
function onBlur(e) {
  emit("blur", e);
}
function onInvalid(e) {
  emit("invalid", e);
}
function onKeydown() {
  attrs.inputRef.checked = !attrs.inputRef.checked;
  emit("input", { target: attrs.inputRef });
}
</script>

<template>
  <label
    role="switch"
    tabindex="0"
    :aria-checked="!!attrs.inputRef?.checked"
    :class="{
      [`${$prefix}input-switch`]: true,
      [`${$prefix}input-switch-checked`]: !!attrs.inputRef?.checked,
    }"
    @keydown.space.prevent="onKeydown"
    @blur="onBlur"
  >
    <input
      type="checkbox"
      v-bind="attrs"
      ref="inputRef"
      @input="onInput"
      @invalid="onInvalid"
      v-show="false"
      :checked="!!attrs.inputRef?.checked"
    />
    <div :class="`${$prefix}input-switch-handle`"></div>
    <span :class="`${$prefix}input-switch-label`">
      <span :class="`${$prefix}input-switch-label-checked`">ON</span>
      <span :class="`${$prefix}input-switch-label-unchecked`">OFF</span>
    </span>
  </label>
</template>

<style scoped lang="scss">
.#{$prefix}input-switch {
  --switch-size: 20px;
  --switch-width: 50px;
  --switch-background-inactive: var(--#{$prefix}color-grey);
  --switch-background-active: var(--#{$prefix}color-primary);

  --switch-handle-size: 14px;
  --switch-handle-grow-size: 4px;
  --switch-handle-background-inactive: white;
  --switch-handle-background-active: white;

  --switch-label-color: white;
  --switch-label-font-size: 10px;
  --switch-label-padding-inner: 2px;
  --switch-label-padding-outer: 0px;

  // computed properties
  --switch-radius: calc(var(--switch-size) / 2);
  --switch-label-padding-top: calc(
    (var(--switch-size) - var(--switch-label-font-size)) / 2
  );
  --switch-padding: calc((var(--switch-size) - var(--switch-handle-size)) / 2);
  --switch-handle-box-size: calc(
    max(
      var(--switch-size),
      var(--switch-size) + (var(--switch-handle-size) - var(--switch-size)) / 2
    )
  );
  --switch-handle-box-padding: calc(
    var(--switch-size) - var(--switch-handle-box-size)
  );
  --switch-margin-inner: calc(
    var(--switch-handle-box-size) + var(--switch-label-padding-inner) +
      var(--switch-handle-grow-size)
  );
  --switch-margin-outer: calc(
    var(--switch-radius) + var(--switch-label-padding-outer)
  );
  margin: 0;
  padding: 0;
  position: relative;
  display: inline-block;
  min-width: var(--switch-width);
  height: var(--switch-size);
  vertical-align: middle;
  background: var(--switch-background-inactive);
  border: 0;
  border-radius: calc(var(--switch-radius));
  // transition: all 0.2s ease-in-out;
  user-select: none;
}

.#{$prefix}input-switch-handle {
  position: absolute;
  top: var(--switch-padding);
  inset-inline-start: var(--switch-padding);
  width: var(--switch-handle-size);
  height: var(--switch-handle-size);
  transition: all 0.2s ease-in-out;

  &::before {
    position: absolute;
    top: 0;
    inset-inline-end: 0;
    bottom: 0;
    inset-inline-start: 0;
    background-color: var(--switch-handle-background-inactive);
    border-radius: calc(var(--switch-handle-size) / 2);
    box-shadow: 0 2px 4px 0 rgb(0 35 11 / 20%);
    transition: all 0.2s ease-in-out;
    content: "";
  }
}
.#{$prefix}input-switch-label {
  display: block;
  overflow: hidden;
  color: var(--switch-label-color);
  border-radius: calc(var(--switch-radius));
  height: var(--switch-size);
  font-size: var(--switch-label-font-size);
  line-height: 1;
}
.#{$prefix}input-switch-label-checked,
.#{$prefix}input-switch-label-unchecked {
  height: 100%;
  display: flex;
  align-items: center;
  transition: margin-inline-start 0.2s ease-in-out,
    margin-inline-end 0.2s ease-in-out;
  pointer-events: none;
}
.#{$prefix}input-switch-label-unchecked {
  justify-content: flex-end;
  margin-top: calc(-1 * var(--switch-size));
  margin-inline-start: var(--switch-margin-inner);
  margin-inline-end: var(--switch-margin-outer);
}
.#{$prefix}input-switch-label-checked {
  margin-inline-start: calc(
    -100% + var(--switch-margin-inner) + var(--switch-margin-outer) + var(--switch-handle-box-padding)
  );
  margin-inline-end: calc(100% - var(--switch-handle-box-padding));
}

.#{$prefix}input-switch-checked {
  background: var(--switch-background-active);

  & .#{$prefix}input-switch-handle {
    inset-inline-start: calc(
      100% - var(--switch-handle-size) - var(--switch-padding)
    );
    &::before {
      background-color: var(--switch-handle-background-active);
    }
  }
  & .#{$prefix}input-switch-label-checked {
    margin-inline-start: var(--switch-margin-outer);
    margin-inline-end: var(--switch-margin-inner);
  }
  & .#{$prefix}input-switch-label-unchecked {
    margin-inline-start: calc(100% - var(--switch-handle-box-padding));
    margin-inline-end: calc(
      -100% + var(--switch-margin-inner) + var(--switch-margin-outer) + var(--switch-handle-box-padding)
    );
  }
}
.#{$prefix}input-switch:active {
  & .#{$prefix}input-switch-handle {
    width: calc(var(--switch-handle-size) + var(--switch-handle-grow-size));
  }
}
.#{$prefix}input-switch:active.#{$prefix}input-switch-checked {
  & .#{$prefix}input-switch-handle {
    inset-inline-start: calc(
      100% - var(--switch-handle-size) - var(--switch-handle-grow-size) -
        var(--switch-padding)
    );
  }
}
</style>
