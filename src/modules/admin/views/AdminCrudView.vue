<script setup>
import BaseTable from "@/components/base/table/BaseTable.vue";
import { Pagination } from "@/gen/proto/commons/pagination_pb";
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { adminResources } from "../adminResources";
import AdminCrudCreateForm from "../components/AdminCrudCreateForm.vue";

const route = useRoute();
const resourceId = route.params.resourceId;
const resource = adminResources.find((el) => el.id === resourceId);

const ctx = reactive({
  data: [],
  pagination: new Pagination({ overridePagination: !resource.usePagination }),
});

async function getAll() {
  const payload = {};
  if (resource.hasPagination) payload.pagination = ctx.pagination;
  const response = await resource.services.getAll.call(payload);
  ctx.data = resource.services.getAll.parseResponseData(response);
  if (response.pagination) ctx.pagination = response.pagination;
}

onMounted(() => {
  getAll();
});
</script>

<template>
  <div class="snt-container" style="overflow-y: auto; padding-top: 0">
    <p style="padding-top: 16px">{{ resource.name }}</p>
    <template v-if="resource.services.create">
      <RouterLink class="snt-button primary" to="#create"
        >Create {{ resource.name }}</RouterLink
      >
      <AdminCrudCreateForm
        :service="resource.services.create"
        :name="resource.name"
      />
    </template>
    <BaseTable
      :columns="resource.tableColumns"
      :data="ctx.data"
      use-sort
      class="primary"
      :use-info="!!resource.services.info"
      :use-edit="!!resource.services.edit"
      :use-delete="!!resource.services.delete"
    />
  </div>
</template>

<style scoped lang="scss"></style>
