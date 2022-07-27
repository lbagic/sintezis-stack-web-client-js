import { useAuthStore } from "../../stores/authStore";
import { createGrpc } from "./base/BaseGrpc";

const authStore = useAuthStore();
export const Grpc = {
  snt: createGrpc({
    hostname: import.meta.env.VITE_GRPC_ENDPOINT,
    getToken: () => authStore.token,
  }),
};

/**
 * Hydrates Grpc model.
 *
 * @prop { any } modelInstance Grpc model to hydrate.
 * @prop { object } data Data with which Grpc model is hydrated.
 * @returns Returns hydrated Grpc model Instance.
 */

export function hydrateGrpcModel(modelInstance, data) {
  const model = modelInstance.toObject();

  Object.keys(data).forEach((key) => {
    const value = model[key];

    const isPrimitive = value !== undefined && !Array.isArray(value);
    const isModel = !!data[key]?.toObject?.()?.id;

    if (isPrimitive || isModel) {
      const setter = "set" + key.charAt(0).toUpperCase() + key.slice(1);
      modelInstance[setter](data[key]);
    }
  });

  return modelInstance;
}

/**
 * Handles custom Grpc options.
 *
 * @typedef {{
 *   useToasts: Boolean,
 * }} GrpcOptions
 *
 * @param { GrpcOptions } options Custom grpc options.
 * @returns {{ options: GrpcOptions }} Returns custom options.
 */
export const grpcOptions = (options) => ({ options });
