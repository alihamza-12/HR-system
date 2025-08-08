<template>
  <Layout>
    <div class="container mt-4">
      <h2 class="text-center mb-4">Attendance Management</h2>

      <!-- Check-in/Check-out Section -->
      <div class="row mb-4">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0">Daily Check-in/Check-out</h5>
            </div>
            <div class="card-body text-center">
              <!-- Always show both buttons -->
              <div class="mb-3">
                <button 
                  class="btn btn-success me-2"
                  @click="handleCheckIn" 
                  :disabled="loading"
                >
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                  Check In
                </button>

                <button 
                  class="btn btn-danger"
                  @click="handleCheckOut" 
                  :disabled="loading"
                >
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                  Check Out
                </button>
              </div>

              <!-- Show status messages -->
              <div v-if="todayAttendance && todayAttendance.checkIn">
                <p class="text-success">
                  <i class="fas fa-clock"></i> Checked in at: {{ formatTime(todayAttendance.checkIn) }}
                </p>
              </div>

              <div v-if="todayAttendance && todayAttendance.checkOut">
                <p class="text-success">
                  <i class="fas fa-check-circle"></i> Completed for today
                </p>
                <p>Checked in: {{ formatTime(todayAttendance.checkIn) }}</p>
                <p>Checked out: {{ formatTime(todayAttendance.checkOut) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right column: Today's Status -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header bg-info text-white">
              <h5 class="mb-0">Today's Status</h5>
            </div>
            <div class="card-body">
              <div v-if="todayAttendance">
                <p><strong>Status:</strong> 
                  <span :class="getStatusClass(todayAttendance)">
                    {{ getStatusText(todayAttendance) }}
                  </span>
                </p>
                <p v-if="todayAttendance.checkIn"><strong>Check-in:</strong> {{ formatTime(todayAttendance.checkIn) }}</p>
                <p v-if="todayAttendance.checkOut"><strong>Check-out:</strong> {{ formatTime(todayAttendance.checkOut) }}</p>
                <p v-if="todayAttendance.totalHours"><strong>Total Hours:</strong> {{ todayAttendance.totalHours }}h</p>
              </div>
              <div v-else>
                <p class="text-muted">No attendance recorded for today</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Attendance History -->
      <div class="card">
        <div class="card-header bg-secondary text-white">
          <h5 class="mb-0">Attendance History</h5>
        </div>
        <div class="card-body">
          <div v-if="loading" class="text-center py-4">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <div v-else-if="error" class="alert alert-danger">
            {{ error }}
          </div>

          <div v-else-if="attendances.length === 0" class="alert alert-info">
            No attendance records found.
          </div>

          <div v-else class="table-responsive">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Employee</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Total Hours</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(attendance, index) in attendances" :key="`${attendance.id}-${index}`">
                  <td>{{ formatDate(attendance.date) }}</td>
                  <td>{{ attendance.employeeName || attendance.employeeEmail || 'Unknown' }}</td>
                  <td>{{ attendance.checkIn ? formatTime(attendance.checkIn) : '-' }}</td>
                  <td>{{ attendance.checkOut ? formatTime(attendance.checkOut) : '-' }}</td>
                  <td>{{ attendance.totalHours || '-' }}</td>
                  <td>
                    <span :class="getStatusClass(attendance)">
                      {{ getStatusText(attendance) }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AttendancePage',
  components: {
    Layout
  },
  computed: {
    ...mapState('attendance', ['attendances', 'loading', 'error']),
    todayAttendance() {
      const today = new Date().toISOString().split('T')[0];
      return this.attendances.find(att => att.date === today);
    }
  },
  methods: {
    ...mapActions('attendance', ['fetchAttendances', 'checkIn', 'checkOut']),
    
    formatTime(time) {
      if (!time) return '-';
      return new Date(time).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    },
    
    formatDate(date) {
      if (!date) return '-';
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },
    
    getStatusClass(attendance) {
      if (attendance.checkOut) return 'badge bg-success';
      if (attendance.checkIn) return 'badge bg-warning';
      return 'badge bg-secondary';
    },
    
    getStatusText(attendance) {
      if (attendance.checkOut) return 'Completed';
      if (attendance.checkIn) return 'Checked In';
      return 'Pending';
    },
    
    async handleCheckIn() {
      try {
        await this.checkIn();
        await this.fetchAttendances();
      } catch (error) {
        console.error('Check-in failed:', error);
      }
    },
    
    async handleCheckOut() {
      try {
        await this.checkOut();
        await this.fetchAttendances();
      } catch (error) {
        console.error('Check-out failed:', error);
      }
    }
  },
  mounted() {
    this.fetchAttendances();
  }
};
</script>

<style scoped>
.badge {
  font-size: 0.8em;
}
</style>
