// src/services/api.js
import axios from 'axios'
import store from '@/store'

const API = axios.create({
  baseURL: 'http://13.61.143.142/api', 
})

//  Attach token on every request if exists
API.interceptors.request.use(config => {
  const authUser=localStorage.getItem("token")
  console.log("authUser Token",authUser)
  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

//  Handle unauthorized errors globally
API.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      store.dispatch('auth/logout')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default API
