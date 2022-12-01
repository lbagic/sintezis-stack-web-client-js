<script setup>
import AdminCrudCreateForm from "@/components/admin/AdminCrudCreateForm.vue";
import AdminCrudDeleteForm from "@/components/admin/AdminCrudDeleteForm.vue";
import AdminCrudEditForm from "@/components/admin/AdminCrudEditForm.vue";
import { modal } from "@/components/base/modal/modal.ctl";
import BaseTable from "@/components/base/table/BaseTable.vue";
import { adminResources } from "@/modules/admin/adminResources";
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const resourceId = route.params.resourceId;

/** @type { ReturnType<import("../resources/base/_types").ResourceFactory> } */
const resource = adminResources.find((el) => el.id === resourceId);

const getAll = resource.setupGetAllContext().call;

const ctx = reactive({
  data: [],
  toDelete: undefined,
  toEdit: undefined,
  pagination: new resource.Pagination({
    overridePagination: !resource.usePagination,
  }),
});

async function actionGetAll() {
  const payload = {};
  if (resource.hasPagination) payload.pagination = ctx.pagination;
  const response = await getAll(payload);
  ctx.data = resource.parseGetAllData(response);
  if (response.pagination) ctx.pagination = response.pagination;
}
function actionDetails(item) {
  router.push(route.fullPath + "/details/" + item.id);
}
function initAddItem() {
  modal.createResource.open();
}
function onAddItem(item) {
  ctx.data.push(item);
}
function initDeleteItem(item) {
  ctx.toDelete = item;
  modal.deleteResource.open();
}
function onDeleteItem(item) {
  const itemIndex = ctx.data.findIndex((el) => el.id === item.id);
  ctx.data.splice(itemIndex, 1);
  ctx.toDelete = undefined;
}
function initEditItem(item) {
  ctx.toEdit = item;
  modal.editResource.open();
}
function onEditItem(item) {
  const itemIndex = ctx.data.findIndex((el) => el.id === item.id);
  ctx.data.splice(itemIndex, 1, item);
  ctx.toEdit = undefined;
}

onMounted(() => {
  actionGetAll();
});
</script>

<template>
  <div :class="`${$prefix}container`" style="overflow-y: auto">
    <template v-if="resource.setupAddContext">
      <button :class="`${$prefix}button success small`" @click="initAddItem">
        Create {{ resource.name }}
      </button>
      <AdminCrudCreateForm @add-item="onAddItem" :resource="resource" />
    </template>
    <template v-if="resource.setupDeleteContext">
      <AdminCrudDeleteForm
        @delete-item="onDeleteItem"
        :item="ctx.toDelete"
        :resource="resource"
      />
    </template>
    <template v-if="resource.setupEditContext">
      <AdminCrudEditForm
        @edit-item="onEditItem"
        :item="ctx.toEdit"
        :resource="resource"
      />
    </template>
    <BaseTable
      :columns="resource.tableColumns"
      :data="ctx.data"
      use-sort
      class="primary"
      :use-info="!!resource.useDetails"
      @info="actionDetails"
      :use-edit="!!resource.setupEditContext"
      @edit="initEditItem"
      :use-delete="!!resource.setupDeleteContext"
      @delete="initDeleteItem"
    />
  </div>
</template>

<style scoped lang="scss"></style>
