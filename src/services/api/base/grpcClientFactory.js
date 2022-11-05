import {
  createGrpcWebTransport,
  createPromiseClient,
} from "@bufbuild/connect-web";

/**
 * @template { import("@bufbuild/protobuf").ServiceType } T
 * @typedef { import("@bufbuild/connect-web").PromiseClient<T> } PromiseClient
 * */
/**
 * @template { import("@bufbuild/protobuf").ServiceType } T
 * @typedef { import("@bufbuild/connect-web").GrpcWebTransportOptions & { service: T } } GrpcWebTransportOptions
 * */

/** @type { <T>(options: GrpcWebTransportOptions<T>) => PromiseClient<T> } */
export function createGrpcPromiseClient({ service, ...options }) {
  return createPromiseClient(service, createGrpcWebTransport(options));
}
