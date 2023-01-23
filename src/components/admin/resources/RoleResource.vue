<script setup lang="ts">
import BaseInput from "@/components/base/input/BaseInput.vue";
import BaseInputNumber from "@/components/base/input/BaseInputNumber.vue";
import { useFormData } from "@/components/base/input/inputController";
import type { Role } from "@/gen/role_pb";
import { adminResourceController } from "@/modules/admin/adminResourceController";
import { grpc } from "@/services/api/grpc";
import { AddOutlined } from "@vicons/material";
import { NDataTable, NModal, NPageHeader } from "naive-ui";

type Resource = Role;

const addForm = useFormData<Partial<Resource>>(
  {
    id: 0,
    name: "",
  },
  grpc.RoleService.add
);
const editForm = useFormData(
  {
    id: 0,
    name: "",
  },
  grpc.RoleService.edit
);
const deleteForm = useFormData(
  {
    id: 0,
  },
  grpc.RoleService.delete
);

const ctx = adminResourceController.setupContext<Role>({
  uniqueKey: "id",
  actionForms: {
    add: addForm,
  },
  tableActionForms: {
    edit: editForm,
    delete: deleteForm,
  },
  tableColumns: [
    { key: "id", title: "Id" },
    { key: "name", title: "Name" },
  ],
});

function getAll() {
  grpc.RoleService.getAll({
    pagination: { overridePagination: true },
  }).then(({ roles }) => (ctx.data.value = roles));
}

getAll();
</script>

<template>
  <component :is="NPageHeader" v-bind="ctx.bind.header" />
  <button
    class="snt-button success"
    style="justify-self: flex-start"
    @click="ctx.showModal.add = true"
  >
    <AddOutlined height="18" /> Create
  </button>
  <component :is="NDataTable" v-bind="ctx.bind.table.value" />
  <component :is="NModal" v-bind="ctx.bind.addModal.value" class="width-s">
    <form class="snt-grid" @submit.prevent>
      <BaseInputNumber
        :constraint="{ required: true }"
        label="Id"
        min="0"
        v-model="addForm.model.id"
      />
      <BaseInput
        :constraint="{ required: true }"
        label="Name"
        v-model="addForm.model.name"
      />
      <button
        :disabled="!addForm.isSubmittable"
        @click="addForm.submit"
        class="snt-button success"
      >
        Add
      </button>
    </form>
  </component>
  <component :is="NModal" v-bind="ctx.bind.editModal.value" class="width-s">
    <form class="snt-grid" @submit.prevent>
      <BaseInputNumber
        :constraint="{ required: true }"
        disabled
        label="Id"
        min="0"
        v-model="editForm.model.id"
      />
      <BaseInput
        :constraint="{ required: true }"
        label="Name"
        v-model="editForm.model.name"
      />
      <button
        :disabled="!editForm.isSubmittable"
        @click="editForm.submit"
        class="snt-button warning"
      >
        Edit
      </button>
    </form>
  </component>
  <component :is="NModal" v-bind="ctx.bind.deleteModal.value" class="width-s">
    <form class="snt-grid" @submit.prevent>
      <BaseInputNumber
        disabled
        :constraint="{ required: true }"
        label="Id"
        min="0"
        v-model="deleteForm.model.id"
      />
      <button
        :disabled="!deleteForm.isSubmittable"
        @click="deleteForm.submit"
        class="snt-button error"
      >
        Delete
      </button>
    </form>
  </component>
</template>

<style scoped lang="scss"></style>
