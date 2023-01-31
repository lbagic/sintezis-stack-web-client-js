<script setup lang="ts">
import { dataTableProps, NDataTable } from "naive-ui";
import type { TableColumns } from "naive-ui/es/data-table/src/interface";
import { computed, h, ref } from "vue";
import { DeleteOutlined, EditOutlined } from "@vicons/material";
import { formatNumber } from "@/utils/number";

const emit = defineEmits(["update:selected"]);
const props = defineProps({
  columns: dataTableProps.columns,
  data: dataTableProps.data,
  selected: Array,
  onEdit: Function,
  onDelete: Function,
  uniqueKey: { type: String, default: "id" },
});

const checkedRowKeys = ref([]);
function updateCheckedRowKeys(keys: any) {
  checkedRowKeys.value = keys;
  const items = checkedRowKeys.value.map((id) =>
    props.data.find((el) => el[props.uniqueKey] === id)
  );
  emit("update:selected", items);
}

function getRowItem(row: any) {
  return props.data.find((el) => el[props.uniqueKey] === row[props.uniqueKey]);
}

const actionList = [
  {
    attrs: {
      title: "Edit",
      class: `snt-button text-active warning tiny`,
      onClick: props.onEdit,
    },
    icon: EditOutlined,
  },
  {
    attrs: {
      title: "Delete",
      class: `snt-button text-active error tiny`,
      onClick: props.onDelete,
    },
    icon: DeleteOutlined,
  },
].filter((el) => el.attrs.onClick);

const renderActions = (row: any) =>
  h(
    "div",
    { class: "snt-flex small" },
    {
      default: () =>
        actionList.map(({ attrs, icon }) =>
          h(
            "button",
            { ...attrs, onClick: () => attrs.onClick?.(getRowItem(row)) },
            h(icon, { width: 20, height: 20 })
          )
        ),
    }
  );

const tableColumns = computed(() => {
  const cols: TableColumns = [];
  if (Array.isArray(props.selected))
    cols.push({ type: "selection", multiple: false });
  if (actionList.length)
    cols.push({ title: "Actions", key: "actions", render: renderActions });
  if (props.columns.length) cols.push(...props.columns);
  else {
    const item = props.data[0];
    const itemKeys = item ? Object.keys(item) : [];
    const itemCols = itemKeys
      .filter((key) => {
        const fieldType = typeof item[key];
        return fieldType === "string" || fieldType === "number";
      })
      .map((key) => ({ key, title: key.toCapitalCase() }));
    cols.push(...itemCols);
  }
  return cols;
});

const renderSummary = (pageData: any) => ({
  [(tableColumns.value[0] as any).key]: {
    value: h("span", `Total: ${formatNumber(pageData.length)}`),
    colSpan: tableColumns.value.length,
  },
});
</script>

<template>
  <NDataTable
    :data="props.data"
    :columns="tableColumns"
    :row-key="(el) => el[props.uniqueKey]"
    :striped="true"
    :checked-row-keys="checkedRowKeys"
    :max-height="500"
    size="small"
    :virtual-scroll="true"
    :summary="renderSummary"
    summaryPlacement="top"
    @update-checked-row-keys="updateCheckedRowKeys"
  />
</template>

<style scoped lang="scss"></style>
