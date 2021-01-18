import Vue from "vue";
import Vuetify from "vuetify";
import App from "./App.vue";

Vue.use(Vuetify);
const vuetify = new Vuetify();

new Vue({
  vuetify,
  render: (h) => h(App)
}).$mount("#root")