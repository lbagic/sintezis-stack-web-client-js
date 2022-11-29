<script setup>
import BaseInput from "@/components/base/input/BaseInput.vue";
import BaseModal from "@/components/base/modal/BaseModal.vue";

const props = defineProps({ resource: undefined });

/** @type { ReturnType<import("../resources/base/_types").ResourceFactory> } */
const resource = props.resource;
const { form } = resource.setupAddContext();
</script>

<template>
  <BaseModal hash="#create" class="primary">
    <form @submit.prevent>
      <p>Create {{ resource.name }}</p>
      <pre>{{ form.data }}</pre>
      <pre>{{ form.model }}</pre>
      <pre>{{ form.isValid }}</pre>
      <div class="snt-grid" style="--gtc: 1fr 1fr">
        <BaseInput
          v-for="(_, key) in form.model"
          :key="key"
          v-model="form.model[key]"
          v-bind="form.config[key]"
        />
      </div>
      <button
        class="snt-button small success expand"
        style="margin-top: 16px"
        :disabled="!form.isValid"
      >
        Create
      </button>
    </form>
  </BaseModal>
</template>

<style scoped lang="scss"></style>
