import API from './api'

const authService = {
  // Login user
  async login(credentials) {
    return API.post('/login', credentials)
  },

  // Register new user
  async register(userData) {
    return API.post('/register', userData)
  },

  // Logout user
  async logout() {
    return API.post('/logout')
  },

  // Get current user profile
  async getCurrentUser() {
    return API.get('/me')
  },

  // Refresh token
  async refreshToken() {
    return API.post('/auth/refresh')
  },

  // Forgot password
  async forgotPassword(email) {
    return API.post('/forgot-password', { email })
  },

  // Reset password
  async resetPassword(token, password) {
    return API.post('/reset-password', { token, password })
  }
}

export default authService
