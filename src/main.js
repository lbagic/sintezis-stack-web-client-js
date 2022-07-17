import { createApp } from "vue";
import { pinia } from "./stores/base/pinia";

import App from "./App.vue";
import { router } from "./router/router.js";

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
