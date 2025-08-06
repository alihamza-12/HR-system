import Vue from 'vue'
import App from './App.vue'
import router from './route'
import store from './store' // this now correctly resolves to store/index.js


import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
