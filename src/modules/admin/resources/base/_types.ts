import { TableColumnsFactory } from "@/components/base/table/_types"
import { StrictPartial } from "@/utils/types"
import { FieldInfo, Message, MessageType, MethodKind } from "@bufbuild/protobuf"
import { Raw } from "vue"

type RpcMethod = {
  name: string,
  I: MessageType,
  O: MessageType,
  kind: MethodKind,
}
export type RpcServiceKeys = ["add", "edit", "get", "getAll", "delete"]
type RpcService = Record<RpcServiceKeys[number], RpcMethod>

type ActionContextFactory<Method extends RpcMethod, T> = (data?: T) => {
  form?: ReturnType<import("@/components/base/input/_types").FormConfigFactory<T>>,
  call: (request?: InstanceType<Method['I']>) => Promise<InstanceType<Method['O']>>
}

type ActionContextFactoryMap<Service extends StrictPartial<Service, RpcService>, Entity extends MessageType> = {
  [K in keyof Service as `setup${Capitalize<string & K>}Context`]: ActionContextFactory<Service[K], Entity>
}
export type ActionParserMap<Service = RpcService> = {
  [K in keyof Service as `parse${Capitalize<string & K>}Data`]: (response: any) => any
}

export type ResourceFactory = <
  Entity extends MessageType,
  Service extends StrictPartial<Service, RpcService>
>(config: {
  entity: Entity,
  rpc: Service,
  name?: string,
  icon?: Raw<object>,
  usePagination: boolean,
  tableColumns?: ReturnType<TableColumnsFactory<Entity>>,
} & 
  Partial<ActionContextFactoryMap<Service, Entity>>
) => {
  entity: Entity,
  rpc: Service,
  name: string,
  icon: Raw<object>,
  usePagination: boolean,
  tableColumns: ReturnType<TableColumnsFactory<Entity>>,
  id: string,
  hasPagination?: boolean,
  hasSearch?: boolean
} &
  Partial<ActionContextFactoryMap<Service, Entity>> &
  Partial<ActionParserMap>
