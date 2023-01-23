import { LockOutlined } from "@vicons/material";
import { defineAsyncComponent, type Component } from "vue";

type Resource = {
  icon: Component;
  component: Component;
};
export const adminResources: Record<string, Resource> = {
  Roles: {
    icon: LockOutlined,
    component: defineAsyncComponent(
      () => import("@/components/admin/resources/RoleResource.vue")
    ),
  },
};
