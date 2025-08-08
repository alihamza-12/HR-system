// src/store/index.js
import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate"

import employee from "./modules/employee"
import auth from "./modules/auth"
import payroll from "./modules/payroll"
import task from "./modules/task"
import announcement from "./modules/announcement"
import attendance from "./modules/attendance"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    task,
    payroll,
    employee,
    auth,
    announcement,
    attendance
  },
  plugins: [createPersistedState()]
})
