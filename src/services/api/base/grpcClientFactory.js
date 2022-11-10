import {
  createConnectTransport,
  createGrpcWebTransport,
  createPromiseClient,
} from "@bufbuild/connect-web";

/**
 * @typedef { Record<string, import("@bufbuild/protobuf").ServiceType> } Services
 * @typedef { import("@bufbuild/connect-web").ConnectTransportOptions } ConnectTransportOptions
 * */

/**
 * @template { import("@bufbuild/protobuf").ServiceType } T
 * @typedef { import("@bufbuild/connect-web").PromiseClient<T> } PromiseClient
 * */

/** @type { <T extends Services>(options: ConnectTransportOptions & { services: T, useEnvoyProxy: boolean }) => Record<keyof T, PromiseClient<T[keyof T]>> } */
export function createGrpcPromiseClient({
  services,
  useEnvoyProxy,
  ...options
}) {
  const transport = useEnvoyProxy
    ? createGrpcWebTransport
    : createConnectTransport;
  return Object.fromEntries(
    Object.entries(services).map(([serviceName, service]) => [
      serviceName,
      createPromiseClient(service, transport(options)),
    ])
  );
}
