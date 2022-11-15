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
 * @template Rpc
 * @template { Record<string, any> } EntityInstance
 * @template ParseReturnType
 * @typedef {{
 *  call: (request: InstanceType<Rpc['I']>) => Promise<InstanceType<Rpc['O']>>,
 *  prepare: (data: EntityInstance) => InstanceType<Rpc['I']>
 *  parse: (response: InstanceType<Rpc['O']>) => ParseReturnType,
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
 *  getAll: ServiceStruct<RpcGetAll, InstanceType<Entity>, InstanceType<Entity>[]>,
 *  create?: ServiceStruct<RpcCreate, InstanceType<Entity>, InstanceType<Entity>>,
 *  icon?: ReturnType<markRaw>,
 *  mapDisplayItem: (obj: InstanceType<Entity>) => Record<string, unknown>,
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
 * >(config: ResourceConfig<Entity, RpcCreate, RpcGetAll>) =>
 * Required<ResourceConfig<Entity, RpcCreate, RpcGetAll>> & {
 *  fields: Fields,
 *  hasPagination: boolean,
 *  id: string,
 * }} ResourceFactory
 */

/** @type { ResourceFactory } */
export const createResource = (config) => {
  const entity = config.entity;
  const fields = entity.fields.list();

  const hasPagination = config.getAll.rpc["O"].fields
    .list()
    .some((el) => el.name === "pagination");
  return {
    ...config,
    fields,
    hasPagination,
    icon: config.icon ?? markRaw(AdminIconFolder),
    name: config.name ?? entity.name,
    id: entity.name,
  };
};
