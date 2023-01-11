<script setup>
import BaseInput from "@/components/base/input/BaseInput.vue";
import BaseModal from "@/components/base/modal/BaseModal.vue";
import { modalController } from "@/components/base/modal/modalController";
import { toastController } from "@/components/base/toast/toastController";
import { usePromise } from "@/utils/usePromise";

const props = defineProps({ resource: undefined });
const emit = defineEmits(["addItem"]);

/** @type { ReturnType<import("@/modules/admin/resources/base/_types").ResourceFactory> } */
// eslint-disable-next-line vue/no-setup-props-destructure
const resource = props.resource;
const ctx = resource.setupAddContext();
const call = usePromise(ctx.call);
async function actionCreate() {
  try {
    const response = await call.execute();
    modalController.createResource.close();
    const item = resource.parseAddData(response);
    emit("addItem", item);
    toastController.success(`${resource.id} created.`);
  } catch {
    toastController.warning(`Failed to create ${resource.id}.`);
  }
}
</script>

<template>
  <BaseModal class="primary" name="createResource">
    <form @submit.prevent :class="`${$prefix}grid small`">
      <p>Create {{ resource.name }}</p>
      <div :class="`${$prefix}grid`" style="--gtc: 1fr 1fr">
        <BaseInput
          v-for="(_, key) in ctx.form.model"
          :key="key"
          v-model="ctx.form.model[key]"
          v-bind="ctx.form.config[key]"
        />
      </div>
      <button
        :class="`${$prefix}button small success expand`"
        style="margin-top: 16px"
        :disabled="!ctx.form.isValid || call.isPending"
        @click="actionCreate"
      >
        Create
      </button>
    </form>
  </BaseModal>
</template>

<style scoped lang="scss"></style>
