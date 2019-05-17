import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Axios from "axios";
import Moment from "moment";
Vue.config.productionTip = false;

Vue.prototype.$http = Axios;
Vue.use(Moment);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
