<script setup>
import BaseInput from "@/components/base/input/BaseInput.vue";
import BaseModal from "@/components/base/modal/BaseModal.vue";
import { modal } from "@/components/base/modal/modal.ctl";
import { toast } from "@/components/base/toast/toast.ctl";
import { usePromise } from "@/utils/usePromise";

const props = defineProps({ resource: undefined, item: undefined });
const emit = defineEmits(["editItem"]);

/** @type { ReturnType<import("@/modules/admin/resources/base/_types").ResourceFactory> } */
const resource = props.resource;
const ctx = $computed(() =>
  props.item ? resource.setupEditContext(props.item) : {}
);
const call = $computed(() => usePromise(ctx.call));
async function actionEdit() {
  try {
    const response = await call.execute();
    modal.editResource.close();
    const item = resource.parseEditData(response);
    emit("editItem", item);
    toast.success(`${resource.id} edited.`);
  } catch {
    toast.danger(`Failed to edit ${resource.id}.`);
  }
}
</script>

<template>
  <BaseModal class="secondary" name="editResource">
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
        :class="`${$prefix}button small secondary expand`"
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
