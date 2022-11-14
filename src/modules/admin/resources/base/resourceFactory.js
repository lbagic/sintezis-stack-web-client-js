import AdminIconFolder from "@/modules/admin/components/icons/AdminIconFolder.vue";
import { markRaw } from "vue";

/**
 * @typedef {<
 *  _Entity,
 *  _GetAllResponse,
 *  Service extends Record<"add" | "edit" | "get" | "getAll" | "delete", (request: any) => Promise<any>>,
 *  Entity = InstanceType<_Entity>,
 *  GetAllResponse = InstanceType<_GetAllResponse>,
 * >(config: {
 *  GetAllResponse: _GetAllResponse,
 *  displayName?: string,
 *  entity: _Entity,
 *  icon?: any,
 *  mapDisplayFields: (obj: Entity) => Record<string, any>,
 *  mapGetAll: (response: GetAllResponse) => { data: Entity[], pagination: GetAllResponse['pagination'] }
 *  service: Service,
 *  usePagination: boolean,
 * }) => {
 *  GetAllResponse: _GetAllResponse,
 *  displayName: string,
 *  entity: _Entity,
 *  fields: ReturnType<MessageType<any>['fields']['list']>
 *  icon: any,
 *  mapDisplayFields: (obj: Entity) => Record<string, any>,
 *  mapGetAll: (response: GetAllResponse) => { data: Entity[], pagination: GetAllResponse['pagination'] }
 *  name: string,
 *  service: Service,
 *  usePagination: boolean,
 *  usePaginationOverride: boolean,
 * }} ResourceFactory
 */

/** @type { ResourceFactory } */
export const createResource = (config) => {
  /** @type { import('@bufbuild/protobuf').MessageType<any> } */
  const entity = config.entity;
  const entityFields = entity.fields.list();
  /** @type { import('@bufbuild/protobuf').MessageType<any> } */
  const getAllResponse = config.GetAllResponse;
  const responseFields = getAllResponse.fields.list();
  const hasPagination = responseFields.some((el) => el.name === "pagination");
  return {
    ...config,
    icon: config.icon ?? markRaw(AdminIconFolder),
    displayName: config.displayName ?? entity.name,
    fields: entityFields,
    name: entity.name,
    usePagination: hasPagination && config.usePagination,
    usePaginationOverride: hasPagination && !config.usePagination,
  };
};
