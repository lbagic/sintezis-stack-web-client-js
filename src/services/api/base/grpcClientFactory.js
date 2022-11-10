import {
  createConnectTransport,
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

/** @type { <T extends Services>(options: ConnectTransportOptions & { services: T }) => { [K in keyof T]: PromiseClient<T[K]>} } */
export function createGrpcPromiseClient({ services, ...options }) {
  return Object.fromEntries(
    Object.entries(services).map(([serviceName, service]) => [
      serviceName,
      createPromiseClient(service, createConnectTransport(options)),
    ])
  );
}
