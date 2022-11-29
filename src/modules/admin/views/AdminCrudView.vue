<script setup>
import BaseTable from "@/components/base/table/BaseTable.vue";
import { Pagination } from "@/gen/proto/commons/pagination_pb";
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { adminResources } from "../adminResources";
import AdminCrudCreateForm from "../components/AdminCrudCreateForm.vue";

const route = useRoute();
const router = useRouter();
const resourceId = route.params.resourceId;

/** @type { ReturnType<import("../resources/base/_types").ResourceFactory> } */
const resource = adminResources.find((el) => el.id === resourceId);

const getAll = resource.setupGetAllContext().call;

const ctx = reactive({
  data: [],
  pagination: new Pagination({ overridePagination: !resource.usePagination }),
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

onMounted(() => {
  actionGetAll();
});
</script>

<template>
  <div :class="`${$prefix}container`" style="overflow-y: auto; padding-top: 0">
    <p style="padding-top: 16px">{{ resource.name }}</p>
    <template v-if="resource.setupAddContext">
      <RouterLink :class="`${$prefix}button primary small`" to="#create"
        >Create {{ resource.name }}</RouterLink
      >
      <AdminCrudCreateForm :resource="resource" />
    </template>
    <BaseTable
      :columns="resource.tableColumns"
      :data="ctx.data"
      use-sort
      class="primary"
      :use-info="!!resource.useDetails"
      @info="actionDetails"
      :use-edit="!!resource.setupEditContext"
      :use-delete="!!resource.setupDeleteContext"
    />
  </div>
</template>

<style scoped lang="scss"></style>
