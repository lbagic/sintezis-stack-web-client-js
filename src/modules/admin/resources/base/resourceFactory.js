// @ts-check
import AdminIconFolder from "@/components/admin/icons/AdminIconFolder.vue";
import { Pagination } from "@/gen/pagination_pb";
import { ScalarType } from "@bufbuild/protobuf";
import { compose, filter, map } from "ramda";
import { markRaw } from "vue";

export const PaginationMessage = Pagination;

/** @type { import("./_types").RpcServiceKeysList } */
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
    const dataField = responseFields.find(
      isFieldType(config.Entity)
    )?.localName;
    serviceParsers[parserName] = dataField
      ? (response) => response[dataField]
      : (response) => response;
  });

  return {
    ...config,
    ...serviceParsers,
    id,
    getId: (data) => data["id"] ?? data["ID"],
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
    name: config.name ?? config.Entity.name.toCapitalCase(),
    useDetails: !!config.useDetails,
    usePagination: !!config.usePagination,
    hasPagination: requestFields.some(isFieldType(PaginationMessage)),
    hasSearch: requestFields.some((el) => el.name === "search"),
    Pagination: PaginationMessage,
  };
};
