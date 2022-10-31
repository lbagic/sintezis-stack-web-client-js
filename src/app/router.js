import { createRouter, createWebHistory } from "vue-router";
import { routes, createNavguard } from "../routes";

// Vue Router
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

createNavguard(router);
