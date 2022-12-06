<script setup>
import BaseModal from "@/components/base/modal/BaseModal.vue";
import { modal } from "@/components/base/modal/modal.ctl";
import BaseTable from "@/components/base/table/BaseTable.vue";
import { toast } from "@/components/base/toast/toast.ctl";
import { usePromise } from "@/utils/usePromise";

const props = defineProps({ resource: undefined, item: undefined });
const emit = defineEmits(["deleteItem"]);

/** @type { ReturnType<import("@/modules/admin/resources/base/_types").ResourceFactory> } */
const resource = props.resource;
const ctx = resource.setupDeleteContext();
const call = usePromise(ctx.call);
async function actionDelete() {
  try {
    await call.execute(props.item);
    modal.deleteResource.close();
    emit("deleteItem", props.item);
    toast.success(`${resource.id} deleted.`);
  } catch {
    toast.danger(`Failed to delete ${resource.id}.`);
  }
}

const data = $computed(() => (props.item ? [props.item] : []));
</script>

<template>
  <BaseModal class="primary" name="deleteResource">
    <div :class="`${$prefix}grid`">
      <p>
        Are you sure you want to delete the following {{ resource.id }} items?
      </p>
      <BaseTable :data="data" :columns="resource.tableColumns" class="danger" />
      <div :class="`${$prefix}flex equals`">
        <button
          :class="`${$prefix}button text danger underline small`"
          @click="actionDelete"
          :disabled="call.isPending"
        >
          Yes, delete please!
        </button>
        <button
          :class="`${$prefix}button text grey underline small`"
          @click="modal.deleteResource.close"
        >
          No, not yet...
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped lang="scss"></style>
