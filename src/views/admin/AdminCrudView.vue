<script setup>
import AdminCrudCreateForm from "@/components/admin/AdminCrudCreateForm.vue";
import AdminCrudDeleteForm from "@/components/admin/AdminCrudDeleteForm.vue";
import AdminCrudEditForm from "@/components/admin/AdminCrudEditForm.vue";
import { modal } from "@/components/base/modal/modal.ctl";
import BaseTable from "@/components/base/table/BaseTable.vue";
import BaseIconAdd from "@/components/icons/BaseIconAdd.vue";
import { adminResources } from "@/modules/admin/adminResources";
import { onMounted, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const resourceId = route.params.resourceId;

/** @type { ReturnType<import("@/modules/admin/resources/base/_types").ResourceFactory> } */
const resource = adminResources.find(({ id }) => id === resourceId);

const getAll = resource.setupGetAllContext().call;
const getId = resource.getId;
const ctx = reactive({
  data: [],
  toDelete: undefined,
  toEdit: undefined,
  pagination: new resource.Pagination({
    page: 1,
    pageSize: 20,
    totalPages: 0,
    total: 0,
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
if (resource.hasPagination && resource.usePagination) {
  watch(() => ctx.pagination.page, actionGetAll);
  watch(() => ctx.pagination.pageSize, actionGetAll);
}
function actionDetails(item) {
  router.push(route.fullPath + "/details/" + getId(item));
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
  const itemIndex = ctx.data.findIndex((el) => getId(el) === getId(item));
  ctx.data.splice(itemIndex, 1);
  ctx.toDelete = undefined;
}
function initEditItem(item) {
  ctx.toEdit = item;
  modal.editResource.open();
}
function onEditItem(item) {
  const itemIndex = ctx.data.findIndex((el) => getId(el) === getId(item));
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
      <button
        :class="`${$prefix}button primary large bold`"
        @click="initAddItem"
      >
        <BaseIconAdd width="25px" height="100%" />
        <p style="padding: 0 4px">Create</p>
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
      :use-delete="!!resource.setupDeleteContext"
      :use-edit="!!resource.setupEditContext"
      :use-info="!!resource.useDetails"
      @delete="initDeleteItem"
      @edit="initEditItem"
      @info="actionDetails"
      v-model:pagination="ctx.pagination"
      use-pagination
      :use-pagination-external="
        resource.usePagination && resource.hasPagination
      "
      use-search
      use-sort
    />
  </div>
</template>

<style scoped lang="scss"></style>
