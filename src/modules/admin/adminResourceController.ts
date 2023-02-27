import type ResourceTable from "@/components/admin/ResourceTable.vue";
import type { useForm } from "@/components/base/input/formController";
import type BaseModal from "@/components/base/modal/BaseModal.vue";
import type { OmitType } from "@/utils/types";
import type { NPageHeader } from "naive-ui";
import { computed, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

export type ResourceForm = ReturnType<typeof useForm>;

export function setupResource<T extends Record<string, any> = any>(config: {
  uniqueKey?: keyof T;
  columns?: { key: keyof Partial<OmitType<T, Function>>; title: string }[];
}) {
  const router = useRouter();
  const route = useRoute();
  const resourceId = route.params.resourceId as string;
  const title = resourceId.toCapitalCase();

  const data = ref<T[]>([]);
  const showModal = reactive({
    add: false,
    edit: false,
    delete: false,
  });

  const headerProps: InstanceType<typeof NPageHeader>["$props"] = {
    title,
    onBack: () => router.push("/"),
  };

  const tableProps = computed(() => {
    const props: InstanceType<typeof ResourceTable>["$props"] = {
      data: data.value,
      columns: config.columns as any,
    };
    return props;
  });

  const addModalProps = computed(() => {
    const props: InstanceType<typeof BaseModal>["$props"] = {
      class: "width-s",
      title: `Create ${title}`,
      preset: "card",
      show: showModal.add,
      onUpdateShow: (value) => (showModal.add = value),
    };
    return props;
  });
  const editModalProps = computed(() => {
    const props: InstanceType<typeof BaseModal>["$props"] = {
      class: "width-s",
      title: `Update ${title}`,
      preset: "card",
      show: showModal.edit,
      onUpdateShow: (value) => (showModal.edit = value),
    };
    return props;
  });
  const deleteModalProps = computed(() => {
    const props: InstanceType<typeof BaseModal>["$props"] = {
      class: "width-s",
      title: `Delete ${title}`,
      preset: "card",
      show: showModal.delete,
      onUpdateShow: (value) => (showModal.delete = value),
    };
    return props;
  });

  return {
    data,
    showModal,
    bind: {
      table: tableProps,
      header: headerProps,
      addModal: addModalProps,
      editModal: editModalProps,
      deleteModal: deleteModalProps,
    },
  };
}
