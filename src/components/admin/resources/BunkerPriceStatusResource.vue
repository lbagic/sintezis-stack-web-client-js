<script setup lang="ts">
import BunkerPriceStatusAddForm from "@/components/forms/BunkerPriceStatusAddForm.vue";
import BunkerPriceStatusDeleteForm from "@/components/forms/BunkerPriceStatusDeleteForm.vue";
import BunkerPriceStatusEditForm from "@/components/forms/BunkerPriceStatusEditForm.vue";
import type { BunkerPriceStatus } from "@/gen/bunkerpricestatus_pb";
import {
  adminResourceController,
  type ResourceForm,
} from "@/modules/admin/adminResourceController";
import { grpc } from "@/services/api/grpc";
import { AddOutlined } from "@vicons/material";
import { NDataTable, NModal, NPageHeader } from "naive-ui";
import { onMounted, ref } from "vue";

const addForm = ref() as ResourceForm;
const editForm = ref() as ResourceForm;
const deleteForm = ref() as ResourceForm;

const ctx = adminResourceController.setupContext<BunkerPriceStatus>({
  actions: {
    add: addForm,
  },
  tableActions: {
    edit: editForm,
    delete: deleteForm,
  },
  tableColumns: [
    { key: "ID", title: "Id" },
    { key: "priceStatus", title: "Price Status" },
  ],
});

function getAll() {
  grpc.BunkerPriceStatusService.getAll({}).then(
    ({ bunkerPriceStatuses }) => (ctx.data.value = bunkerPriceStatuses)
  );
}

onMounted(() => {
  getAll();
});
</script>

<template>
  <component :is="NPageHeader" v-bind="ctx.bind.header" />
  <button
    class="snt-button primary"
    style="justify-self: flex-start"
    @click="ctx.showModal.add = true"
  >
    <AddOutlined height="18" /> Create
  </button>
  <component :is="NDataTable" v-bind="ctx.bind.table.value" />
  <component :is="NModal" v-bind="ctx.bind.addModal.value">
    <BunkerPriceStatusAddForm
      ref="addForm"
      @success="ctx.showModal.add = false"
    />
  </component>
  <component :is="NModal" v-bind="ctx.bind.editModal.value">
    <BunkerPriceStatusEditForm
      ref="editForm"
      @success="ctx.showModal.edit = false"
    />
  </component>
  <component :is="NModal" v-bind="ctx.bind.deleteModal.value">
    <BunkerPriceStatusDeleteForm
      ref="deleteForm"
      @success="ctx.showModal.delete = false"
    />
  </component>
</template>

<style scoped lang="scss"></style>
