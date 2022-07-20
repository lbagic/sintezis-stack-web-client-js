import "./polyfills";
import App from "./App.vue";
import { createApp } from "vue";
import { pinia } from "./stores/base/store.js";
import { router } from "./router/router.js";

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
