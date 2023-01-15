import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

export const useRouteTitle = () => {
  const r = useRoute();
  const title = ref("");
  watchEffect(
    () =>
      (title.value =
        typeof r.meta.title === "function"
          ? r.meta.title(r)
          : r.meta.title ?? "")
  );
  return title;
};
