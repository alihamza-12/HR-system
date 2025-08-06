// src/store/index.js
import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate"

import employee from "./modules/employee"
import auth from "./modules/auth"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    employee,
    auth
  },
  plugins: [createPersistedState()]
})
