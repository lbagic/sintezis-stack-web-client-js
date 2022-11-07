import {
  createGrpcWebTransport,
  createPromiseClient,
} from "@bufbuild/connect-web";

/**
 * @typedef { Record<string, import("@bufbuild/protobuf").ServiceType> } Services
 * @typedef { import("@bufbuild/connect-web").GrpcWebTransportOptions } GrpcWebTransportOptions
 * */

/**
 * @template { import("@bufbuild/protobuf").ServiceType } T
 * @typedef { import("@bufbuild/connect-web").PromiseClient<T> } PromiseClient
 * */

/** @type { <T extends Services>(options: GrpcWebTransportOptions & { services: T }) => Record<keyof T, PromiseClient<T[keyof T]>> } */
export function createGrpcPromiseClient({ services, ...options }) {
  return Object.fromEntries(
    Object.entries(services).map(([serviceName, service]) => [
      serviceName,
      createPromiseClient(service, createGrpcWebTransport(options)),
    ])
  );
}
