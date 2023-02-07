import {
  createConnectTransport,
  createGrpcWebTransport,
  createPromiseClient,
  type ConnectTransportOptions,
  type PromiseClient,
} from "@bufbuild/connect-web";
import type { ServiceType } from "@bufbuild/protobuf";
import * as R from "ramda";

type GrpcClientFactoryConfig<T> = {
  services: T;
  useEnvoyProxy?: Boolean;
  transportOptions: ConnectTransportOptions;
};

export function createGrpcClient<T extends Record<string, ServiceType>>(
  config: GrpcClientFactoryConfig<T>
) {
  const { useEnvoyProxy, services, transportOptions } = config;

  const createTransport = useEnvoyProxy
    ? createGrpcWebTransport
    : createConnectTransport;

  const clients = R.mapObjIndexed(
    (service) =>
      createPromiseClient(service, createTransport(transportOptions)),
    services
  ) as { [K in keyof T]: PromiseClient<T[K]> };

  return clients;
}
