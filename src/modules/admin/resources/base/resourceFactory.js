// @ts-check
import AdminIconFolder from "@/modules/admin/components/icons/AdminIconFolder.vue";
import { ScalarType } from "@bufbuild/protobuf";
import { compose, filter, map } from "ramda";
import { markRaw } from "vue";

/** @type { import("./_types").RpcServiceKeys } */
const serviceFunctionKeys = ["add", "edit", "get", "getAll", "delete"];

/** @type { import("./_types").ResourceFactory } */
export const createResource = (config) => {
  const entity = config.entity;
  const id = entity.name;
  const fields = entity.fields.list();
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
      (/** @type { any } */ el) => entity.typeName === el.T.typeName
    ).name;
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
    name: config.name ?? entity.name,
    useDetails: !!config.useDetails,
    usePagination: !!config.usePagination,
    hasPagination: requestFields.some((el) => el.name === "pagination"),
    hasSearch: requestFields.some((el) => el.name === "search"),
  };
};
