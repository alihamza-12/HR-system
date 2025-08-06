// import api from '@/services/api'

// const state = {
//   employees: [],
//   currentEmployee: null,
//   loading: false,
//   error: null
// }

// const getters = {
//   allEmployees: state => state.employees,
//   activeEmployees: state => state.employees.filter(emp => emp.is_active),
//   deletedEmployees: state => state.employees.filter(emp => !emp.is_active),
//   currentEmployee: state => state.currentEmployee,
//   isLoading: state => state.loading,
//   hasError: state => state.error,
//   getEmployeeById: state => id => state.employees.find(emp => emp.id === id)
// }

// const actions = {
//   async loadEmployees({ commit }) {
//     commit('SET_LOADING', true)
//     commit('SET_ERROR', null)
//     try {
//       const response = await api.get('/employees')
//       const employeesData = response.data?.data || response.data || []
      
//       const employees = employeesData.map(emp => ({
//         id: emp.id,
//         name: emp.name || `${emp.firstName || ''} ${emp.lastName || ''}`.trim() || 'Unknown',
//         firstName: emp.firstName || '',
//         lastName: emp.lastName || '',
//         email: emp.email || '',
//         phone: emp.phone || '',
//         position: emp.position || emp.role || '',
//         department: emp.department || '',
//         startDate: emp.startDate || emp.start_date || '',
//         salary: emp.salary || 0,
//         address: emp.address || '',
//         skills: emp.skills || '',
//         is_active: emp.is_active !== undefined ? emp.is_active : true,
//         resume: emp.resume || '',
//         contract: emp.contract || ''
//       }))
      
//       commit('SET_EMPLOYEES', employees)
//     } catch (error) {
//       commit('SET_ERROR', error.response?.data?.message || 'Failed to load employees')
//       throw error
//     } finally {
//       commit('SET_LOADING', false)
//     }
//   },

//   async loadEmployee({ commit }, id) {
//     commit('SET_LOADING', true)
//     commit('SET_ERROR', null)
//     try {
//       const response = await api.get(`/employees/${id}`)
//       const emp = response.data
      
//       const employee = {
//         id: emp.id,
//         name: emp.name || `${emp.firstName || ''} ${emp.lastName || ''}`.trim() || 'Unknown',
//         firstName: emp.firstName || '',
//         lastName: emp.lastName || '',
//         email: emp.email || '',
//         phone: emp.phone || '',
//         position: emp.position || emp.role || '',
//         department: emp.department || '',
//         startDate: emp.startDate || emp.start_date || '',
//         salary: emp.salary || 0,
//         address: emp.address || '',
//         skills: emp.skills || '',
//         is_active: emp.is_active !== undefined ? emp.is_active : true,
//         resume: emp.resume || '',
//         contract: emp.contract || ''
//       }
      
//       commit('SET_CURRENT_EMPLOYEE', employee)
//       return employee
//     } catch (error) {
//       commit('SET_ERROR', error.response?.data?.message || 'Failed to load employee')
//       throw error
//     } finally {
//       commit('SET_LOADING', false)
//     }
//   },

//   async addEmployee({ commit, dispatch }, employeeData) {
//     commit('SET_LOADING', true)
//     commit('SET_ERROR', null)
//     try {
//       const response = await api.post('/employees', employeeData)
//       const newEmployee = response.data
      
//       commit('ADD_EMPLOYEE', newEmployee)
//       await dispatch('loadEmployees')
//       return newEmployee
//     } catch (error) {
//       commit('SET_ERROR', error.response?.data?.message || 'Failed to add employee')
//       throw error
//     } finally {
//       commit('SET_LOADING', false)
//     }
//   },

//   async updateEmployee({ commit, dispatch }, { id, ...employeeData }) {
//     commit('SET_LOADING', true)
//     commit('SET_ERROR', null)
//     try {
//       const response = await api.put(`/employees/${id}`, employeeData)
//       const updatedEmployee = response.data
      
//       commit('UPDATE_EMPLOYEE', updatedEmployee)
//       await dispatch('loadEmployees')
//       return updatedEmployee
//     } catch (error) {
//       commit('SET_ERROR', error.response?.data?.message || 'Failed to update employee')
//       throw error
//     } finally {
//       commit('SET_LOADING', false)
//     }
//   },

//   async deleteEmployee({ commit, dispatch }, id) {
//     commit('SET_LOADING', true)
//     commit('SET_ERROR', null)
//     try {
//       await api.delete(`/employees/${id}`)
//       commit('REMOVE_EMPLOYEE', id)
//       await dispatch('loadEmployees')
//     } catch (error) {
//       commit('SET_ERROR', error.response?.data?.message || 'Failed to delete employee')
//       throw error
//     } finally {
//       commit('SET_LOADING', false)
//     }
//   },

//   async toggleEmployeeStatus({ commit, dispatch }, { id, isActive }) {
//     commit('SET_LOADING', true)
//     commit('SET_ERROR', null)
//     try {
//       const response = await api.patch(`/employees/${id}`, { is_active: isActive })
//       commit('UPDATE_EMPLOYEE', response.data)
//       await dispatch('loadEmployees')
//     } catch (error) {
