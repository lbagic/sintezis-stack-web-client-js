// @ts-check
import AdminIconFolder from "@/modules/admin/components/icons/AdminIconFolder.vue";
import { markRaw } from "vue";

/** @type { import("./_types").RpcServiceKeys } */
const serviceFunctionKeys = ["add", "edit", "get", "getAll", "delete"];

/** @type { import("./_types").ResourceFactory } */
export const createResource = (config) => {
  const entity = config.entity;
  const id = entity.name;

  if (!config.rpc.getAll)
    throw new Error(`Resource ${id} does not have "GetAll" method.`);
  const requestFields = config.rpc.getAll["I"].fields.list();

  const serviceParsers = {};
  serviceFunctionKeys.forEach((key) => {
    const method = config.rpc[key];
    if (!method) return;

    const responseFields = method.O.fields.list();
    const parserName = `parse${key.toPascalCase()}Data`;
    const dataField = responseFields.find((/** @type { any } */ el) =>
      entity.equals(entity, el.T)
    ).name;
    serviceParsers[parserName] = (response) => response[dataField];
  });

  return {
    ...config,
    ...serviceParsers,
    id,
    icon: config.icon ?? markRaw(AdminIconFolder),
    name: config.name ?? entity.name,
    hasPagination: requestFields.some((el) => el.name === "pagination"),
    hasSearch: requestFields.some((el) => el.name === "search"),
  };
};
