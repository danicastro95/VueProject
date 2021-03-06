import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);

const moment = require('moment')
require('moment/locale/es')

Vue.config.productionTip = false
Vue.use(require('vue-moment'), {
  moment
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')