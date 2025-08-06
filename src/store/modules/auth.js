// src/store/modules/auth.js
import authService from '../../services/authService'




const state = {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user'))||null,
  loading: false,
  error: null,
}

const getters = {
  isAuthenticated: state => !!state.token,
  token: state => state.token,
  loading: state => state.loading,
  error: state => state.error,
}
const actions = {
  // login
  async login({ commit }, credentials) {
    commit('setLoading', true)
    commit('setError', null)
    try {
      const response = await authService.login(credentials)

      console.log("Token:", response.data.data.token)
      console.log("Login response data:", response.data.data.user)
      
      const token = response.data?.token || response.data?.data?.token
      const user=response.data?.user || response.data?.data?.user

      commit('setToken', token)
      commit('setUser',user)

    
      localStorage.setItem('token', token)
      localStorage.setItem('user',JSON.stringify(user))

      
      return { success: true }
    } catch (error) {
      commit('setError', error.message)
      return { success: false, message: error.message }
    } finally {
      commit('setLoading', false)
    }
  },
  // register
  async register({ commit }, userData) {
    commit('setLoading', true)
    commit('setError', null)
    try {
      const response = await authService.register(userData)

      console.log("Sending signup data:", userData);

      const token = response.token
      commit('setToken', token)
      localStorage.setItem('token', token)
      return { success: true }
    } catch (error) {
      commit('setError', error.message)
      return { success: false, message: error.message }
    } finally {
      commit('setLoading', false)
    }
  },

  logout({ commit }) {
    commit('setToken', null)
    commit('setUser', null)
    localStorage.removeItem('token')
  }
}

const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setUser(state, user) {
    state.user = user
  },
  setLoading(state, loading) {
    state.loading = loading
  },
  setError(state, error) {
    state.error = error
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
