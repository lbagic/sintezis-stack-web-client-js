import type { TableColumnsFactory } from "@/components/base/table/_types";
import type { StrictPartial, UnwrapCtor } from "@/utils/types";
import type { MessageType, MethodKind } from "@bufbuild/protobuf";
import type { Raw } from "vue";
import type { PaginationMessage } from "./resourceFactory";

type RpcMethod = {
  name: string;
  I: MessageType;
  O: MessageType;
  kind: MethodKind;
};
export type RpcServiceKeysList = ["add", "edit", "get", "getAll", "delete"];
type RpcServiceKeys = ["add", "edit", "get", "getAll", "delete"][number];
type RpcService = Record<RpcServiceKeys, RpcMethod>;

type ActionContextFactory<Method extends RpcMethod, T> = (data: T) => {
  form?: ReturnType<
    import("@/components/base/input-old/_types").FormConfigFactory<T>
  >;
  call: (
    request: InstanceType<Method["I"]>
  ) => Promise<InstanceType<Method["O"]>>;
};

type ActionContextFactoryMap<
  Service extends StrictPartial<Service, RpcService>,
  Entity extends MessageType
> = {
  [K in keyof Service as `setup${Capitalize<
    string & K
  >}Context`]: ActionContextFactory<Service[K], UnwrapCtor<Entity>>;
};
export type ActionParserMap<Service = RpcService> = {
  [K in keyof Service as `parse${Capitalize<string & K>}Data`]: (
    response: any
  ) => any;
};

export type ResourceFactory = <
  Entity extends MessageType,
  Service extends StrictPartial<Service, RpcService>
>(
  config: {
    Entity: Entity;
    rpc: Service;
    name?: string;
    icon?: Raw<object>;
    usePagination?: boolean;
    useDetails?: boolean;
    tableColumns?: ReturnType<TableColumnsFactory<Entity>>;
  } & Partial<ActionContextFactoryMap<Service, Entity>>
) => {
  Entity: Entity;
  getId: (data: Entity) => number;
  Pagination: typeof PaginationMessage;
  rpc: Service;
  name: string;
  icon: Raw<object>;
  usePagination: boolean;
  useDetails: boolean;
  tableColumns: ReturnType<TableColumnsFactory<Entity>>;
  id: string;
  hasPagination?: boolean;
  hasSearch?: boolean;
} & Partial<ActionContextFactoryMap<Service, Entity>> &
  Partial<ActionParserMap>;

// type X = UnwrapCtor<Order>

// type FilterMap<U, PK = never> = {[K in keyof Required<UnwrapCtor<U>> as `${PK extends never ? Capitalize<K & string> : Capitalize<K & string>}`]: UnwrapCtor<U>[K] extends Message<any> ? FilterMap<UnwrapCtor<U>[K]> : UnwrapCtor<U>[K]}
// type A = FilterMap<Order>
// type B = User extends Message<any> ? string : never
