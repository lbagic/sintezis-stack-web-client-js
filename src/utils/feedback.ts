import { createDiscreteApi } from "naive-ui";
import type {
  DiscreteApi,
  DiscreteApiType,
} from "naive-ui/es/discrete/src/interface";

// Supported types: "message", "dialog", "notification"
const types = ["dialog"] satisfies DiscreteApiType[];

export const feedback = createDiscreteApi(types) as Pick<
  DiscreteApi,
  (typeof types)[number]
>;
