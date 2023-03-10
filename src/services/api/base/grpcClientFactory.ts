import { createPromiseClient, type PromiseClient } from "@bufbuild/connect";
import {
  createConnectTransport,
  type ConnectTransportOptions,
} from "@bufbuild/connect-web";
import type { ServiceType } from "@bufbuild/protobuf";
import { mapObjIndexed } from "ramda";

type Services = Record<string, ServiceType>;

export function createGrpcClient<T extends Services>(config: {
  services: T;
  options: ConnectTransportOptions;
}) {
  const transport = createConnectTransport(config.options);
  const clients = mapObjIndexed(
    (service) => createPromiseClient(service, transport),
    config.services
  ) as { [K in keyof T]: PromiseClient<T[K]> };

  return clients;
}
