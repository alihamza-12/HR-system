<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h5 class="mb-0">Attendance Records</h5>
      <button class="btn btn-sm btn-primary" @click="refreshData">
        <i class="fas fa-sync-alt"></i> Refresh
      </button>
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

      <div v-else>
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>Date</th>
                <th>Employee</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Total Hours</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="attendance in attendances" :key="attendance.id">
                <td>{{ formatDate(attendance.date) }}</td>
                <td>{{ attendance.employeeName || attendance.employeeEmail || attendance.employeeId || 'Unknown' }}</td>
                <td>{{ attendance.checkIn ? formatTime(attendance.checkIn) : '-' }}</td>
                <td>{{ attendance.checkOut ? formatTime(attendance.checkOut) : '-' }}</td>
                <td>{{ attendance.totalHours || '-' }}</td>
                <td>{{ attendance.location || '-' }}</td>
                <td>
                  <span :class="getStatusBadgeClass(attendance)">
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AttendanceList',
  computed: {
    ...mapGetters('attendance', ['allAttendances', 'isLoading', 'getError']),
    attendances() {
      return this.allAttendances || [];
    },
    loading() {
      return this.isLoading;
    },
    error() {
      return this.getError;
    }
  },
  methods: {
    ...mapActions('attendance', ['fetchAttendances']),
    
    refreshData() {
      this.fetchAttendances();
    },
    
    formatDate(dateString) {
      if (!dateString) return '-';
      return new Date(dateString).toLocaleDateString();
    },
    
    formatTime(dateTimeString) {
      if (!dateTimeString) return '-';
      return new Date(dateTimeString).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    },
    
    getStatusBadgeClass(attendance) {
      if (!attendance) return 'badge bg-secondary';
      if (attendance.checkIn && attendance.checkOut) {
        return 'badge bg-success';
      } else if (attendance.checkIn && !attendance.checkOut) {
        return 'badge bg-warning';
      } else {
        return 'badge bg-danger';
      }
    },
    
    getStatusText(attendance) {
      if (!attendance) return 'Unknown';
      if (attendance.checkIn && attendance.checkOut) {
        return 'Completed';
      } else if (attendance.checkIn && !attendance.checkOut) {
        return 'Checked In';
      } else {
        return 'Absent';
      }
    }
  },
  async mounted() {
    await this.fetchAttendances();
  }
};
</script>

<style scoped>
.badge {
  font-size: 0.75em;
}
</style>
