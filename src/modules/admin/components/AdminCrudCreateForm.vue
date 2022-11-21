<script setup>
import BaseInput from "@/components/base/input/BaseInput.vue";
import BaseModal from "@/components/base/modal/BaseModal.vue";
import { useFormFactory } from "@/components/base/input/input.ctl";

const props = defineProps({ service: undefined, name: String });
// const emit = defineEmits(["response"]);
const form = useFormFactory(props.service.form);

// function createItem() {}
</script>

<template>
  <BaseModal hash="#create" class="primary">
    <form @submit.prevent>
      <p>Create {{ props.name }}</p>
      <pre>{{ form.data }}</pre>
      <div class="snt-grid" style="--gtc: 1fr 1fr">
        <BaseInput
          v-for="(_, key) in form.model"
          :key="key"
          v-model="form.model[key]"
          v-bind="props.service.form[key].bind"
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
