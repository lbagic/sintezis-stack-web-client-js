import { createApp } from "vue";
import App from "./App.vue";
import { setup } from "./app/setup/setup";

const app = createApp(App);
setup(app);
app.mount("#app");
