import Vue from 'vue'
import App from './App.vue'
import router from './route'
import store from './store' // this now correctly resolves to store/index.js

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
