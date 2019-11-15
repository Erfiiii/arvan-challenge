import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
window.$ = require('jquery')
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import notificationMixin from "./mixins/notification"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  mixins:[notificationMixin],
  render: h => h(App)
}).$mount('#app')
