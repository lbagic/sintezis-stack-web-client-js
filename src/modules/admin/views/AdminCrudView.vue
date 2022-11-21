<script setup>
import BaseTable from "@/components/base/table/BaseTable.vue";
import { Pagination } from "@/gen/proto/commons/pagination_pb";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { adminResources } from "../adminResources";
import AdminCrudCreateForm from "../components/AdminCrudCreateForm.vue";

const route = useRoute();
const resourceId = route.params.resourceId;
const resource = adminResources.find((el) => el.id === resourceId);
const { create, getAll, hasPagination, usePagination } = resource;

let rawData = $ref([]);

let pagination = $ref(new Pagination());
if (!usePagination) pagination.overridePagination = true;

async function getAllItems() {
  const payload = {};
  if (hasPagination) payload.pagination = pagination;
  const response = await getAll.call(payload);
  rawData = getAll.parse(response);
  if (response.pagination) pagination = response.pagination;
}
function log(x) {
  console.log(x);
}

onMounted(() => {
  getAllItems();
});
</script>

<template>
  <div class="snt-container" style="overflow-y: auto">
    <template v-if="create">
      <AdminCrudCreateForm :service="create" :name="resource.name" />
    </template>
    <BaseTable
      :columns="resource.tableColumns"
      :data="rawData"
      use-sort
      class="muted"
      @info="log"
      use-delete
      use-edit
      use-info
    />
  </div>
</template>

<style scoped lang="scss"></style>
