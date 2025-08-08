import api from './api';

const attendanceService = {
  // Check-in user
  async checkIn(data) {
    const response = await api.post('/attendance/check-in', data);
    return response.data;
  },

  // Check-out user
  async checkOut(data) {
    const response = await api.post('/attendance/check-out', data);
    return response.data;
  },

  // List all attendances
  async getAllAttendances(params = {}) {
    const response = await api.get('/attendances', { params });
    return response.data;
  },

  // Get attendance by ID
  async getAttendanceById(id) {
    const response = await api.get(`/attendances/${id}`);
    return response.data;
  }
};

export default attendanceService;
