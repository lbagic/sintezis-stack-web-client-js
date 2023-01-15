import type { RouteBreadcrumb } from "@/app/router";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

export const useRouteBreadcrumbs = () => {
  const r = useRoute();
  const breadcrumbs = ref<RouteBreadcrumb[]>([]);
  watchEffect(() => (breadcrumbs.value = r.meta.breadcrumbs?.(r) ?? []));
  return breadcrumbs;
};
