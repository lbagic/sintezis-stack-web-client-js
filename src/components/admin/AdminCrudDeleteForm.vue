<script setup>
import BaseModal from "@/components/base/modal/BaseModal.vue";
import { modalController } from "@/components/base/modal/modalController";
// import STable from "@/components/base/table/STable.vue";
import { feedback } from "@/utils/feedback";

const props = defineProps({ resource: undefined, item: undefined });
const emit = defineEmits(["deleteItem"]);
/** @type { ReturnType<import("@/modules/admin/resources/base/_types").ResourceFactory> } */
// eslint-disable-next-line vue/no-setup-props-destructure
const resource = props.resource;
let isPending = $ref(false);

async function actionDelete() {
  try {
    isPending = true;
    await resource.setupDeleteContext(props.item).call();
    isPending = false;
    modalController.deleteResource.close();
    emit("deleteItem", props.item);
    feedback.message.success(`${resource.id} deleted.`);
  } catch {
    feedback.message.error(`Failed to delete ${resource.id}.`);
  }
}

// const data = $computed(() => (props.item ? [props.item] : []));
</script>

<template>
  <BaseModal class="error" name="deleteResource">
    <div :class="`${$prefix}grid`">
      <p>
        Are you sure you want to delete the following {{ resource.id }} items?
      </p>
      <!-- <STable :data="data" :columns="resource.tableColumns" class="error" /> -->
      <div :class="`${$prefix}flex equals`">
        <button
          :class="`${$prefix}button text error underline small`"
          @click="actionDelete"
          :disabled="isPending"
        >
          Yes, delete please!
        </button>
        <button
          :class="`${$prefix}button text grey underline small`"
          @click="modalController.deleteResource.close"
        >
          No, not yet...
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped lang="scss"></style>
