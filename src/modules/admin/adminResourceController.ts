import type { useFormData } from "@/components/base/input/inputController";
import { formatNumber } from "@/utils/number";
import { DeleteOutlined, EditOutlined } from "@vicons/material";
import type {
  DataTableColumns,
  NDataTable,
  NModal,
  NPageHeader,
} from "naive-ui";
import * as R from "ramda";
import { computed, h, reactive, ref, type Ref } from "vue";
import { useRouter } from "vue-router";

export type ResourceForm = Ref<{ form: ReturnType<typeof useFormData> }>;
type Actions = Partial<{
  add: ResourceForm;
}>;
type TableActions = Partial<{
  edit: ResourceForm;
  delete: ResourceForm;
}>;

const tableConfig = {
  delete: { icon: DeleteOutlined, color: "error" },
  edit: { icon: EditOutlined, color: "warning" },
} satisfies Record<keyof TableActions, any>;

function setupContext<T extends Record<string, any> = any>(config: {
  uniqueKey?: string;
  tableColumns: DataTableColumns<T>;
  actions?: Actions;
  tableActions?: TableActions;
}) {
  const router = useRouter();
  const id = router.currentRoute.value.params.resourceId as string;
  const title = id.toCapitalCase();
  const uniqueKey = config.uniqueKey ?? "ID";
  const onBack = () => router.push("/");

  const data = ref<T[]>([]);
  const checkedRowKeys = ref<any[]>([]);
  function rowToItem(row: any) {
    return data.value.find((el) => el[uniqueKey] === row[uniqueKey]);
  }
  const selected = computed(() => checkedRowKeys.value.map(rowToItem));
  const showModal = reactive({
    add: false,
    edit: false,
    delete: false,
  });

  const headerProps: InstanceType<typeof NPageHeader>["$props"] = {
    title,
    onBack,
  };

  const tableProps = computed(() => {
    const columns = config.tableColumns;
    const actions = config.tableActions;
    if (actions) {
      columns.unshift({
        title: "Actions",
        key: "actions",
        render: (row) =>
          h(
            "div",
            { class: "snt-flex" },
            {
              default: () =>
                R.keys(actions).map((actionName) =>
                  h(
                    "button",
                    {
                      class: `snt-button ${tableConfig[actionName].color} tiny text`,
                      onClick: () => {
                        showModal[actionName] = true;
                        const item = rowToItem(row);
                        console.log(item);
                        setTimeout(() =>
                          actions[actionName]?.value.form.hydrate(item)
                        );
                      },
                      title: actionName,
                    },
                    h(tableConfig[actionName].icon, { width: 16, height: 16 })
                  )
                ),
            }
          ),
      });
    }
    const props: InstanceType<typeof NDataTable>["$props"] = {
      columns,
      data: data.value as any,
      rowKey: (el) => el[uniqueKey],
      checkedRowKeys: checkedRowKeys.value,
      virtualScroll: true,
      maxHeight: 500,
      striped: true,
      summary: (pageData) => ({
        actions: {
          value: h("span", `Total: ${formatNumber(pageData.length)}`),
          colSpan: columns.length - 1,
        },
      }),
      summaryPlacement: "top",
      onUpdateCheckedRowKeys: (value) => (checkedRowKeys.value = value),
    };
    return props;
  });

  const addModalProps = computed(() => {
    const props: InstanceType<typeof NModal>["$props"] = {
      class: "snt-width-s",
      title: `Create ${title}`,
      preset: "card",
      show: showModal.add,
      onUpdateShow: (value) => (showModal.add = value),
    };
    return props;
  });
  const editModalProps = computed(() => {
    const props: InstanceType<typeof NModal>["$props"] = {
      class: "snt-width-s",
      title: `Update ${title}`,
      preset: "card",
      show: showModal.edit,
      onUpdateShow: (value) => (showModal.edit = value),
    };
    return props;
  });
  const deleteModalProps = computed(() => {
    const props: InstanceType<typeof NModal>["$props"] = {
      class: "snt-width-s",
      title: `Delete ${title}`,
      preset: "card",
      show: showModal.delete,
      onUpdateShow: (value) => (showModal.delete = value),
    };
    return props;
  });

  return {
    data,
    selected,
    checkedRowKeys,
    hasPagination: false,
    usePagination: false,
    showModal,
    title,
    onBack,
    bind: {
      table: tableProps,
      header: headerProps,
      addModal: addModalProps,
      editModal: editModalProps,
      deleteModal: deleteModalProps,
    },
  };
}

export const adminResourceController = {
  setupContext,
};
