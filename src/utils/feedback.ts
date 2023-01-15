import { createDiscreteApi } from "naive-ui";
import type {
  DiscreteApi,
  DiscreteApiType,
} from "naive-ui/es/discrete/src/interface";
import { theme } from "@/app/theme";

// Supported types: "message", "dialog", "notification"
const types = ["message", "dialog", "notification"] satisfies DiscreteApiType[];

export const feedback = createDiscreteApi(types, {
  configProviderProps: { themeOverrides: theme },
}) as Pick<DiscreteApi, (typeof types)[number]>;
