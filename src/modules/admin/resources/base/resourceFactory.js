// @ts-check
import { Pagination } from "@/gen/proto/commons/pagination_pb";
import AdminIconFolder from "@/modules/admin/components/icons/AdminIconFolder.vue";
import { ScalarType } from "@bufbuild/protobuf";
import { compose, filter, map } from "ramda";
import { markRaw } from "vue";

export const PaginationMessage = Pagination;

/** @type { import("./_types").RpcServiceKeys } */
const serviceFunctionKeys = ["add", "edit", "get", "getAll", "delete"];
const isFieldType = (entity) => (el) => entity.typeName === el.T.typeName;

/** @type { import("./_types").ResourceFactory } */
export const createResource = (config) => {
  const id = config.Entity.name;
  const fields = config.Entity.fields.list();
  const requestFields = config.rpc.getAll?.["I"].fields.list();

  if (!config.rpc.getAll)
    throw new Error(`Resource ${id} does not have "GetAll" method.`);

  const serviceParsers = {};
  serviceFunctionKeys.forEach((key) => {
    const method = config.rpc[key];
    if (!method) return;

    const responseFields = method.O.fields.list();
    const parserName = `parse${key.toPascalCase()}Data`;
    const dataField = responseFields.find(isFieldType(config.Entity)).name;
    serviceParsers[parserName] = (response) => response[dataField];
  });

  return {
    ...config,
    ...serviceParsers,
    id,
    tableColumns:
      config.tableColumns ??
      compose(
        map((el) => ({
          label: el.localName.toSentenceCase(),
          field: el.localName,
        })),
        filter((el) => typeof el.T === "number" && el.T !== ScalarType.BYTES)
      )(fields),
    icon: config.icon ?? markRaw(AdminIconFolder),
    name: config.name ?? config.Entity.name,
    useDetails: !!config.useDetails,
    usePagination: !!config.usePagination,
    hasPagination: requestFields.some(isFieldType(PaginationMessage)),
    hasSearch: requestFields.some((el) => el.name === "search"),
    Pagination: PaginationMessage,
  };
};
