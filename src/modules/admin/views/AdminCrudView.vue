<script setup>
import { Pagination } from "@/gen/proto/commons/pagination_pb";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { adminResources } from "../adminResources";
import AdminCrudCreateForm from "../components/AdminCrudCreateForm.vue";
import AdminCrudTable from "../components/AdminCrudTable.vue";

const route = useRoute();
const resourceId = route.params.resourceId;
const resource = adminResources.find((el) => el.id === resourceId);
const { create, getAll, hasPagination, mapDisplayItem, usePagination } =
  resource;

let rawData = $ref([]);
const displayKeys = Object.keys(mapDisplayItem());
const displayData = $computed(() => rawData.map(mapDisplayItem));

let pagination = $ref(new Pagination());
if (!usePagination) pagination.overridePagination = true;

async function getAllItems() {
  const payload = {};
  if (hasPagination) payload.pagination = pagination;
  const response = await getAll.call(payload);
  rawData = getAll.parse(response);
  if (response.pagination) pagination = response.pagination;
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
    <AdminCrudTable
      :raw-data="rawData"
      :display-data="displayData"
      :display-keys="displayKeys"
    />
  </div>
</template>

<style scoped lang="scss"></style>
