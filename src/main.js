import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router/router";
import "./assets/main.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Vue3Toastify from "vue3-toastify";

library.add(fas);
const app = createApp(App);

loadFonts();
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(Vue3Toastify);
app.use(vuetify);

app.use(router);
app.mount("#app");

// createApp(App).use(vuetify).use(router).mount("#app");
