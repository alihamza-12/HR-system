// src/store/modules/attendance.js
import attendanceService from '@/services/attendanceService';

const state = {
  attendances: [],
  currentAttendance: null,
  loading: false,
  error: null,
  todayAttendance: null
};

const getters = {
  allAttendances: (state) => state.attendances,
  currentAttendance: (state) => state.currentAttendance,
  todayAttendance: (state) => state.todayAttendance,
  isLoading: (state) => state.loading,
  getError: (state) => state.error
};

const actions = {
  // Fetch all attendances
  async fetchAttendances({ commit }, params = {}) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    
    try {
      const response = await attendanceService.getAllAttendances(params);
      // Transform API response to match frontend expectations
      const transformedData = transformAttendanceData(response.data || response);
      commit('SET_ATTENDANCES', transformedData);
      return response;
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Failed to fetch attendances');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  // Check-in user
  async checkIn({ commit }, checkInData) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    
    try {
      const response = await attendanceService.checkIn(checkInData);
      const transformedData = transformSingleAttendance(response.data || response);
      commit('ADD_ATTENDANCE', transformedData);
      return response;
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Failed to check in');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  // Check-out user
  async checkOut({ commit }, checkOutData) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    
    try {
      const response = await attendanceService.checkOut(checkOutData);
      const transformedData = transformSingleAttendance(response.data || response);
      commit('UPDATE_ATTENDANCE', transformedData);
      return response;
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Failed to check out');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  // Get attendance by ID
  async fetchAttendance({ commit }, id) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    
    try {
      const response = await attendanceService.getAttendanceById(id);
      const transformedData = transformSingleAttendance(response.data || response);
      commit('SET_CURRENT_ATTENDANCE', transformedData);
      return response;
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Failed to fetch attendance');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  }
};

// Helper function to transform API data to frontend format
function transformAttendanceData(data) {
  if (!Array.isArray(data)) return [];
  
  return data.map(item => ({
    id: item.id,
    date: item.check_in ? item.check_in.split(' ')[0] : null,
    checkIn: item.check_in,
    checkOut: item.check_out,
    totalHours: item.worked_minutes ? (item.worked_minutes / 60).toFixed(2) : '0.00',
    employeeId: item.user?.id || item.user_id,
    employeeName: item.user?.name,
    employeeEmail: item.user?.email,
    user: item.user, // Keep the full user object for reference
    workedMinutes: item.worked_minutes,
    location: null // Default since API doesn't provide location
  }));
}

// Helper function to transform single attendance record
function transformSingleAttendance(item) {
  if (!item) return null;
  
  return {
    id: item.id,
    date: item.check_in ? item.check_in.split(' ')[0] : null,
    checkIn: item.check_in,
    checkOut: item.check_out,
    totalHours: item.worked_minutes ? (item.worked_minutes / 60).toFixed(2) : '0.00',
    employeeId: item.user?.id || item.user_id,
    employeeName: item.user?.name,
    employeeEmail: item.user?.email,
    user: item.user, // Keep the full user object for reference
    workedMinutes: item.worked_minutes,
    location: null // Default since API doesn't provide location
  };
}

const mutations = {
  SET_ATTENDANCES(state, attendances) {
    state.attendances = attendances;
  },
  
  ADD_ATTENDANCE(state, attendance) {
    state.attendances.unshift(attendance);
  },
  
  UPDATE_ATTENDANCE(state, updatedAttendance) {
    const index = state.attendances.findIndex(
      attendance => attendance.id === updatedAttendance.id
    );
    if (index !== -1) {
      state.attendances.splice(index, 1, updatedAttendance);
    }
  },
  
  SET_CURRENT_ATTENDANCE(state, attendance) {
    state.currentAttendance = attendance;
  },
  
  SET_TODAY_ATTENDANCE(state, attendance) {
    state.todayAttendance = attendance;
  },
  
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  
  SET_ERROR(state, error) {
    state.error = error;
  },
  
  CLEAR_ERROR(state) {
    state.error = null;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
