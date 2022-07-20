<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
defineProps({
  label: String,
});
</script>

<template>
  <div>
    <label v-if="label" :for="label">{{ label }}</label>
    <input :id="label" v-bind="$attrs" />
  </div>
</template>

<style scoped lang="scss">
input:invalid {
  border: 1px solid red;
}
input:valid {
  border: 1px solid green;
}
</style>
