<script setup lang="ts">
import ResourceTable from "@/components/admin/ResourceTable.vue";
import BaseInput from "@/components/base/input/BaseInput.vue";
import BaseInputNumber from "@/components/base/input/BaseInputNumber.vue";
import { useFormData } from "@/components/base/input/inputController";
import BaseModal from "@/components/base/modal/BaseModal.vue";
import { setupResource } from "@/modules/admin/adminResourceController";
import { grpc } from "@/services/api/grpc";
import type { OmitType } from "@/utils/types";
import type { Role } from "@buf/sintezis_reti.bufbuild_es/role_pb";
import { AddOutlined } from "@vicons/material";
import { NPageHeader } from "naive-ui";

type Resource = OmitType<Role, Function>;
const service = grpc.RoleService;

const ctx = setupResource<Resource>({
  uniqueKey: "id",
  columns: [
    { key: "id", title: "Id" },
    { key: "name", title: "Name" },
  ],
});

function getAll() {
  service
    .getAll({
      pagination: { overridePagination: true },
    })
    .then(({ roles }) => (ctx.data.value = roles));
}
getAll();

const forms = {
  add: useFormData({
    name: "",
  }),
  edit: useFormData({
    id: 0,
    name: "",
  }),
  delete: useFormData({
    id: 0,
  }),
};

function onAddOpen() {
  ctx.showModal.add = true;
}
async function onAddSubmit() {
  const item = await service.add(forms.add.data);
  ctx.data.value.add(item);
  ctx.showModal.add = false;
}

function onEditOpen(item: Resource) {
  ctx.showModal.edit = true;
  forms.edit.hydrate(item);
}
async function onEditSubmit() {
  const item = await service.edit(forms.edit.data);
  ctx.data.value.add(item);
  ctx.showModal.edit = false;
}

function onDeleteOpen(item: Resource) {
  ctx.showModal.delete = true;
  forms.delete.hydrate(item);
}
async function onDeleteSubmit() {
  await service.delete(forms.delete.data);
  ctx.data.value.remove(forms.delete.data);
  ctx.showModal.delete = false;
}
</script>

<template>
  <NPageHeader v-bind="ctx.bind.header" />
  <button class="snt-button success justify-self-start" @click="onAddOpen">
    <AddOutlined height="18" /> Create
  </button>
  <ResourceTable
    v-bind="ctx.bind.table.value"
    @edit="onEditOpen"
    @delete="onDeleteOpen"
  />
  <BaseModal v-bind="ctx.bind.addModal.value">
    <form class="snt-grid" @submit.prevent>
      <BaseInput
        :constraint="{ required: true }"
        label="Name"
        v-model="forms.add.model.name"
      />
      <button
        :disabled="!forms.add.isSubmittable"
        @click="onAddSubmit"
        class="snt-button success"
      >
        Add
      </button>
    </form>
  </BaseModal>
  <BaseModal v-bind="ctx.bind.editModal.value">
    <form class="snt-grid" @submit.prevent>
      <BaseInputNumber
        :constraint="{ required: true }"
        disabled
        label="Id"
        min="0"
        v-model="forms.edit.model.id"
      />
      <BaseInput
        :constraint="{ required: true }"
        label="Name"
        v-model="forms.edit.model.name"
      />
      <button
        :disabled="!forms.edit.isSubmittable"
        @click="onEditSubmit"
        class="snt-button warning"
      >
        Edit
      </button>
    </form>
  </BaseModal>
  <BaseModal v-bind="ctx.bind.deleteModal.value">
    <form class="snt-grid" @submit.prevent>
      <BaseInputNumber
        disabled
        :constraint="{ required: true }"
        label="Id"
        :min="0"
        v-model="forms.delete.model.id"
      />
      <button
        :disabled="!forms.delete.isSubmittable"
        @click="onDeleteSubmit"
        class="snt-button error"
      >
        Delete
      </button>
    </form>
  </BaseModal>
</template>

<style scoped lang="scss"></style>
