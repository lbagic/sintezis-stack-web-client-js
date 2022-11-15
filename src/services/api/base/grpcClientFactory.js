import {
  createConnectTransport,
  createGrpcWebTransport,
  createPromiseClient,
} from "@bufbuild/connect-web";

/**
 * @typedef { Record<string, import("@bufbuild/protobuf").ServiceType> } Services
 * @typedef { import("@bufbuild/connect-web").ConnectTransportOptions } ConnectTransportOptions
 */

/**
 * @template { import("@bufbuild/protobuf").ServiceType } T
 * @typedef { import("@bufbuild/connect-web").PromiseClient<T> } PromiseClient
 */

/**
 * @type { <T extends Services>(options: ConnectTransportOptions & { services: T, useEnvoyProxy?: boolean }) => { [K in keyof T]: PromiseClient<T[K]> } }
 */
export function createGrpcPromiseClient({
  services,
  useEnvoyProxy,
  ...options
}) {
  const createTransport = useEnvoyProxy
    ? createGrpcWebTransport
    : createConnectTransport;

  return Object.fromEntries(
    Object.entries(services).map(([key, service]) => [
      key,
      createPromiseClient(service, createTransport(options)),
    ])
  );
}
