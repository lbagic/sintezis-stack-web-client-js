<script setup>
import BaseInput from "@/components/base/input/BaseInput.vue";
import BaseModal from "@/components/base/modal/BaseModal.vue";
import { modalController } from "@/components/base/modal/modalController";
import { feedback } from "@/utils/feedback";
import { usePromise } from "@/utils/usePromise";

const props = defineProps({ resource: undefined, item: undefined });
const emit = defineEmits(["editItem"]);

/** @type { ReturnType<import("@/modules/admin/resources/base/_types").ResourceFactory> } */
// eslint-disable-next-line vue/no-setup-props-destructure
const resource = props.resource;
const ctx = $computed(() =>
  props.item ? resource.setupEditContext(props.item) : {}
);
const call = $computed(() => usePromise(ctx.call));
async function actionEdit() {
  try {
    const response = await call.execute();
    modalController.editResource.close();
    const item = resource.parseEditData(response);
    emit("editItem", item);
    feedback.message.success(`${resource.id} edited.`);
  } catch {
    feedback.message.error(`Failed to edit ${resource.id}.`);
  }
}
</script>

<template>
  <BaseModal class="accent" name="editResource">
    <form @submit.prevent v-if="ctx" :class="`${$prefix}grid small`">
      <p>Edit {{ resource.name }}</p>
      <div :class="`${$prefix}grid`" style="--gtc: 1fr 1fr">
        <BaseInput
          v-for="(config, key) in ctx.form.config"
          :key="key"
          v-model="ctx.form.model[key]"
          v-bind="config"
        />
      </div>
      <button
        :class="`${$prefix}button small accent expand`"
        style="margin-top: 16px"
        :disabled="!ctx.form.isValid || call.isPending"
        @click="actionEdit"
      >
        Edit
      </button>
    </form>
  </BaseModal>
</template>

<style scoped lang="scss"></style>
