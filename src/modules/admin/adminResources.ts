import { AttachMoneyOutlined, MoneyOutlined } from "@vicons/material";
import { defineAsyncComponent, type Component } from "vue";

type Resource = {
  icon: Component;
  component: Component;
};
export const adminResources: Record<string, Resource> = {
  BunkerPrice: {
    icon: MoneyOutlined,
    component: defineAsyncComponent(
      () => import("@/components/admin/resources/BunkerPriceResource.vue")
    ),
  },
  BunkerPriceStatus: {
    icon: AttachMoneyOutlined,
    component: defineAsyncComponent(
      () => import("@/components/admin/resources/BunkerPriceStatusResource.vue")
    ),
  },
};
