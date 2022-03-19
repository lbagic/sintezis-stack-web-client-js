<script setup lang="ts">
import BaseButton from "../components/base/BaseButton.vue";
import BaseIcon from "../components/base/BaseIcon.vue";
import BaseModal from "../components/base/BaseModal.vue";

const modal = $ref<InstanceType<typeof BaseModal> | null>(null);
</script>

<template>
  <div class="wrap">
    <BaseButton color-name="accent">Button</BaseButton>
    <BaseButton>Button</BaseButton>
    <router-link to="#dialog">dialog</router-link>
    <BaseIcon icon="IconClose" button color-name="error" scale="2" />
    <BaseModal class="dialog" hash="#dialog" query="dialog" ref="modal">
      <input type="text" autofocus />
      <input type="text" />
      <input type="text" />
      <input type="text" />
      <input type="text" />
    </BaseModal>
  </div>
</template>

<style lang="scss" scoped>
.wrap > div {
  padding: 1rem;
}
</style>
