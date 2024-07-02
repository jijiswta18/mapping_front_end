import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

import axios from "axios";
import Swal from 'sweetalert2';

import './globalMixin'; // เรียกใช้ Global Mixin

import '@fortawesome/fontawesome-free/css/all.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.prototype.$axios = axios;
Vue.prototype.$swal = Swal;

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
