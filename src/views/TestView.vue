<script setup lang="ts">
import BaseButton from "../components/base/BaseButton.vue";
import BaseIcon from "../components/base/BaseIcon.vue";
import BaseModal from "../components/base/BaseModal.vue";

const modal = $ref<InstanceType<typeof BaseModal>>();
</script>

<template>
  <div class="wrap">
    <div class="btn-group">
      <button class="btn btn-link">button</button>
      <router-link class="btn btn-primary" to="#">link</router-link>
      <BaseIcon icon="IconClose" button />
    </div>
    <BaseButton>Button</BaseButton>
    <BaseButton color="secondary" to="#dialog">Button</BaseButton>
    <router-link to="#dialog">dialog</router-link>
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
