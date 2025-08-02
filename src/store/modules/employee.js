const state = {
  employees: []
}

const getters = {
  allEmployees: (state) => state.employees,
  getEmployeeById: (state) => (id) => {
    return state.employees.find(employee => employee.id === parseInt(id))
  }
}

const mutations = {
  SET_EMPLOYEES(state, employees) {
    state.employees = employees
  },
  ADD_EMPLOYEE(state, employee) {
    state.employees.push(employee)
  },
  UPDATE_EMPLOYEE(state, updatedEmployee) {
    const index = state.employees.findIndex(emp => emp.id === updatedEmployee.id)
    if (index !== -1) {
      state.employees.splice(index, 1, updatedEmployee)
    }
  },
  REMOVE_EMPLOYEE(state, employeeId) {
    state.employees = state.employees.filter(emp => emp.id !== employeeId)
  }
}

const actions = {
  loadEmployees({ commit }) {
    // In a real app, this would be an API call
    // For now, we'll use the sample data
    const sampleEmployees = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        position: 'Software Engineer',
        department: 'IT',
        email: 'john.doe@example.com',
        phone: '(123) 456-7890',
        dob: '1990-01-01',
        address: '123 Main Street, City, State 12345',
        emergencyContact: 'Jane Doe - (987) 654-3210',
        startDate: '2020-03-15',
        salary: 85000,
        manager: 'Robert Johnson',
        status: 'active',
        performance: {
          rating: 4.5,
          projects: 24,
          attendance: 98
        }
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        position: 'HR Manager',
        department: 'Human Resources',
        email: 'jane.smith@example.com',
        phone: '(987) 654-3210',
        dob: '1985-05-15',
        address: '456 Oak Avenue, Town, State 67890',
        emergencyContact: 'John Smith - (123) 456-7890',
        startDate: '2018-07-22',
        salary: 95000,
        manager: 'Michael Brown',
        status: 'active',
        performance: {
          rating: 4.8,
          projects: 32,
          attendance: 99
        }
      }
    ]
    commit('SET_EMPLOYEES', sampleEmployees)
  },
  addEmployee({ commit }, employee) {
    // In a real app, this would be an API call
    const newEmployee = {
      ...employee,
      id: Date.now(), // Simple ID generation for now
      status: 'active',
      performance: {
        rating: 0,
        projects: 0,
        attendance: 0
      }
    }
    commit('ADD_EMPLOYEE', newEmployee)
    return newEmployee
  },
  updateEmployee({ commit }, employee) {
    // In a real app, this would be an API call
    commit('UPDATE_EMPLOYEE', employee)
  },
  removeEmployee({ commit }, employeeId) {
    // In a real app, this would be an API call
    commit('REMOVE_EMPLOYEE', employeeId)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
