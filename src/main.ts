import { setupApp } from "@/app/setup";
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
setupApp(app);
app.mount("#app");
