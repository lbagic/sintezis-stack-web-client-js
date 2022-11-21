import AdminIconFolder from "@/modules/admin/components/icons/AdminIconFolder.vue";
import { markRaw } from "vue";

/**
 * @typedef { import('@bufbuild/protobuf').MethodKind } MethodKind
 * @typedef { import('@bufbuild/protobuf').MessageType<unknown> } MessageType
 * @typedef {{
 *  name: string,
 *  I: MessageType,
 *  O: MessageType,
 *  kind: MethodKind
 * }} RpcStruct
 */

/**
 * @template T
 * @typedef { import("@/components/base/table/table.ctl").TableColumns<T> } TableColumns
 */

/**
 * @template Rpc
 * @template { Record<string, any> } EntityInstance
 * @template ResponseType
 * @typedef {{
 *  call: (request: InstanceType<Rpc['I']>) => Promise<InstanceType<Rpc['O']>>,
 *  parseResponseData: (response: InstanceType<Rpc['O']>) => ResponseType,
 *  rpc: Rpc
 *  form?: EntityInstance
 * }} ServiceStruct
 */

/**
 * @template Entity
 * @template RpcCreate
 * @template RpcGetAll
 * @typedef {{
 *  entity: Entity,
 *  services: {
 *    getAll: ServiceStruct<RpcGetAll, InstanceType<Entity>, InstanceType<Entity>[]>,
 *    create?: ServiceStruct<RpcCreate, InstanceType<Entity>, InstanceType<Entity>>,
 *    edit?: ServiceStruct<RpcCreate, InstanceType<Entity>, InstanceType<Entity>>,
 *    delete?: ServiceStruct<RpcCreate, InstanceType<Entity>, InstanceType<Entity>>,
 *  }
 *  icon?: ReturnType<markRaw>,
 *  tableColumns: TableColumns<InstanceType<Entity>>,
 *  name?: string,
 *  usePagination: boolean,
 * }} ResourceConfig
 */

/**
 * @typedef {<
 *  Entity extends MessageType,
 *  RpcCreate extends RpcStruct,
 *  RpcGetAll extends RpcStruct,
 *  Fields = ReturnType<Entity['fields']['list']>,
 * >(config: ResourceConfig<Entity, RpcCreate, RpcGetAll>) => Required<ResourceConfig<Entity, RpcCreate, RpcGetAll>> & {
 *  fields: Fields,
 *  hasPagination: boolean,
 *  hasSearch: boolean,
 *  id: string,
 * }} ResourceFactory
 */

/** @type { ResourceFactory } */
export const createResource = (config) => {
  const entity = config.entity;
  const fields = entity.fields.list();

  Object.values(config.services).forEach((service) => {
    const dataField = service.rpc["O"].fields
      .list()
      .find((el) => entity.equals(entity, el.T));
    if (!dataField)
      throw new Error("Entity field not found, cant create response parser.");
    service.parseResponseData = (response) => response[dataField.name];
  });

  const requestFields = config.services.getAll.rpc["I"].fields.list();

  return {
    ...config,
    fields,
    hasPagination: requestFields.some((el) => el.name === "pagination"),
    hasSearch: requestFields.some((el) => el.name === "search"),
    icon: config.icon ?? markRaw(AdminIconFolder),
    name: config.name ?? entity.name,
    id: entity.name,
  };
};
