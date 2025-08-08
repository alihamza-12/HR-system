import api from '@/services/api';

export default {
  namespaced: true,
  state: {
    payrolls: [],
    isLoading: false,
    error: null
  },
  mutations: {
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_PAYROLLS(state, payrolls) {
      state.payrolls = payrolls;
    },
    ADD_PAYROLL(state, payroll) {
      state.payrolls.push(payroll);
    },
    UPDATE_PAYROLL(state, updatedPayroll) {
      const index = state.payrolls.findIndex(p => p['Payroll ID'] === updatedPayroll['Payroll ID']);
      if (index !== -1) {
        state.payrolls.splice(index, 1, updatedPayroll);
      }
    },
    DELETE_PAYROLL(state, id) {
      state.payrolls = state.payrolls.filter(p => p['Payroll ID'] !== id);
    }
  },
  actions: {
    async fetchPayrolls({ commit }) {
      commit('SET_LOADING', true);
      try {
        const response = await api.get('/payroll/list');
        const payrolls = Array.isArray(response.data.data) ? response.data.data : [];
        commit('SET_PAYROLLS', payrolls);
        commit('SET_ERROR', null);
        return payrolls;
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to fetch payrolls');
        console.error('Fetching payrolls failed:', error);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async createPayroll({ commit, dispatch }, payrollData) {
      commit('SET_LOADING', true);
      try {
        const response = await api.post('/payroll', payrollData);
        commit('ADD_PAYROLL', response.data.data);
        commit('SET_ERROR', null);
        // Reload the payroll list after successful creation
        await dispatch('fetchPayrolls');
        return response.data.data;
      } catch (error) {
        await dispatch('fetchPayrolls');
        commit('SET_ERROR', error.response?.data?.message || 'Failed to create payroll');
        console.error('Payroll creation failed:', error);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async updatePayroll({ commit }, payrollData) {
      commit('SET_LOADING', true);
      try {
        // Ensure we have the correct payroll ID
        const payrollId = payrollData['Payroll ID'] || payrollData.payroll_id || payrollData.id;
        
        // Ensure all required fields are present
        const updateData = {
          user_id: payrollData.user_id || payrollData['User ID'],
          basic_pay: payrollData.basic_pay || payrollData['Basic Pay'],
          bonuses: payrollData.bonuses || payrollData['Bonuses'],
          pay_date: payrollData.pay_date || payrollData['Pay Date'],
          net_salary: payrollData.net_salary || payrollData['Net Salary']
        };
        
        const response = await api.put(`/payroll/update/${payrollId}`, updateData);
        commit('UPDATE_PAYROLL', response.data.data);
        commit('SET_ERROR', null);
        return response.data.data;
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to update payroll');
        console.error('Updating payroll failed:', error);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async deletePayroll({ commit }, id) {
      commit('SET_LOADING', true);
      try {
        await api.post(`/payroll/delete/${id}`);
        commit('DELETE_PAYROLL', id);
        commit('SET_ERROR', null);
        return true;
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to delete payroll');
        console.error('Deleting payroll failed:', error);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async fetchPayrollByUser({ commit }, userId) {
      commit('SET_LOADING', true);
      try {
        const response = await api.get(`/payroll/user/${userId}`);
        return response.data.data;
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to fetch user payroll');
        console.error('Fetching user payroll failed:', error);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    }
  },
  getters: {
    payrolls: state => state.payrolls,
    isLoading: state => state.isLoading,
    error: state => state.error
  }
};