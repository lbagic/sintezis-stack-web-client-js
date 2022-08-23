import { useAuthStore } from "../../stores/authStore";
import { createGrpc } from "./base/BaseGrpc";

const authStore = useAuthStore();

export const Grpc = {
  snt: createGrpc({
    baseUrl: import.meta.env.VITE_SNT_GRPC_ENDPOINT,
    getToken: () => authStore.token,
  }),
};

/**
 * Hydrate Grpc model with plain js data.
 *
 * @param { any } modelInstance Decsripton.
 * @param { Record<string, any> } data Data with which Grpc model is hydrated.
 * @returns { any } Returns hydrated Grpc model Instance.
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
 * Add custom Grpc options.
 *
 * @typedef {{
 *   useToasts: Boolean,
 * }} GrpcOptions
 *
 * @param { GrpcOptions } options Custom grpc options.
 * @returns {{ options: GrpcOptions }} Returns custom options.
 */
export const grpcOptions = (options) => ({ options });
