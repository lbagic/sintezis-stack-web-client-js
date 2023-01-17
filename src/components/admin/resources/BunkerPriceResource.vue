<script setup lang="ts">
import BunkerPriceAddForm from "@/components/forms/BunkerPriceAddForm.vue";
import BunkerPriceDeleteForm from "@/components/forms/BunkerPriceDeleteForm.vue";
import BunkerPriceEditForm from "@/components/forms/BunkerPriceEditForm.vue";
import type { BunkerPrice } from "@/gen/bunkerprice_pb";
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

const ctx = adminResourceController.setupContext<BunkerPrice>({
  actions: {
    add: addForm,
  },
  tableActions: {
    edit: editForm,
    delete: deleteForm,
  },
  tableColumns: [
    { key: "ID", title: "Id" },
    { key: "bunkerPriceStatusID", title: "Price Status" },
  ],
});

function getAll() {
  grpc.BunkerPriceService.getAll({
    pagination: { overridePagination: true },
  }).then(({ bunkerPrices }) => (ctx.data.value = bunkerPrices));
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
    <BunkerPriceAddForm ref="addForm" @success="ctx.showModal.add = false" />
  </component>
  <component :is="NModal" v-bind="ctx.bind.editModal.value">
    <BunkerPriceEditForm ref="editForm" @success="ctx.showModal.edit = false" />
  </component>
  <component :is="NModal" v-bind="ctx.bind.deleteModal.value">
    <BunkerPriceDeleteForm
      ref="deleteForm"
      @success="ctx.showModal.delete = false"
    />
  </component>
</template>

<style scoped lang="scss"></style>
