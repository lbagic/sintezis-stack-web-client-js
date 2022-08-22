<script setup>
import BaseInput from "../../../components/base/BaseInput.vue";
import { useFormData } from "../../../components/base/input.ctl";
import BaseModal from "../../../components/base/BaseModal.vue";
import { modal } from "../../../components/base/modal.ctl";
import { toast } from "../../../components/base/toast.ctl";

const form = useFormData({
  email: "",
});
</script>

<template>
  <div class="test-view-wrapper">
    <form @submit.prevent>
      <h2>Form example:</h2>
      <BaseInput
        placeholder="user@mail.com"
        v-model="form.model.email"
        label="User email"
        required
      />
      <button type="submit" class="snt-button primary">submit</button>
      <pre>form: {{ form }}</pre>
    </form>

    <div>
      <h2>Modal example:</h2>
      <button class="snt-button primary" @click="modal.localModal.open">
        Open local modal
      </button>
      <button class="snt-button secondary" @click="modal.expandedModal.open">
        Open expanded modal
      </button>
      <div
        style="
          height: 500px;
          width: 500px;
          position: relative;
          border: 1px solid black;
        "
      >
        <BaseModal local keep-alive name="localModal" class="primary">
          <input placeholder="I am autofocused" autofocus />
          <p>local modal</p>
        </BaseModal>
      </div>
      <BaseModal expand keep-alive name="expandedModal">
        <input placeholder="I am autofocused" autofocus />
        <p>expanded modal</p>
      </BaseModal>
    </div>

    <div>
      <h2>Toast example</h2>
      <button
        class="snt-button success"
        @click="toast.success('Success message')"
      >
        Trigger success toast
      </button>
      <button class="snt-button danger" @click="toast.danger('Danger message')">
        Trigger danger toast
      </button>
      <button class="snt-button info" @click="toast.info('Info message')">
        Trigger info toast
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.test-view-wrapper {
  display: grid;
  gap: 1rem;
  & > * {
    display: grid;
    gap: 0.5rem;
    align-content: flex-start;
  }
}
h2 {
  font-size: 1.4rem;
}
</style>
