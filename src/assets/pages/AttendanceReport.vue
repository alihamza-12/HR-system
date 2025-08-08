<template>
  <Layout>
    <div class="container mt-4">
      <h2 class="text-center mb-4">Attendance Report</h2>

      <!-- Check-in/Check-out Buttons for Logged-in User -->
      <div class="row mb-3">
        <div class="col-md-12 text-center">
          <button 
            class="btn btn-success me-2" 
            @click="handleCheckIn"
            :disabled="loadingCheckIn"
          >
            <i class="fas fa-sign-in-alt"></i>
            {{ loadingCheckIn ? 'Checking In...' : 'Check In' }}
          </button>
          <button 
            class="btn btn-warning" 
            @click="handleCheckOut"
            :disabled="loadingCheckOut"
          >
            <i class="fas fa-sign-out-alt"></i>
            {{ loadingCheckOut ? 'Checking Out...' : 'Check Out' }}
          </button>
          <div v-if="currentUser" class="mt-2">
            <small class="text-muted">
              Logged in as: <strong>{{ currentUser.name }}</strong>
            </small>
          </div>
        </div>
      </div>

      <!-- Report Filters -->
      <div class="card mb-4">
        <div class="card-header bg-primary text-white">
          <h5 class="mb-0">Report Filters</h5>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-3">
              <label class="form-label">Start Date</label>
              <input type="date" class="form-control" v-model="filters.startDate" @change="generateReport">
            </div>
            <div class="col-md-3">
              <label class="form-label">End Date</label>
              <input type="date" class="form-control" v-model="filters.endDate" @change="generateReport">
            </div>
            <div class="col-md-3">
              <label class="form-label">Employee</label>
              <select class="form-select" v-model="filters.employeeId" @change="generateReport">
                <option value="">All Employees</option>
                <option v-for="employee in employees" :key="employee.id" :value="employee.id">
                  {{ employee.name }}
                </option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">Status</label>
              <select class="form-select" v-model="filters.status" @change="generateReport">
                <option value="">All Status</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
                <option value="half-day">Half Day</option>
              </select>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-12">
              <button class="btn btn-success me-2" @click="exportToExcel">
                <i class="fas fa-file-excel"></i> Export to Excel
              </button>
              <button class="btn btn-danger" @click="exportToPDF">
                <i class="fas fa-file-pdf"></i> Export to PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="row mb-4">
        <div class="col-md-3">
          <div class="card bg-primary text-white">
            <div class="card-body">
              <h5 class="card-title">Total Days</h5>
              <h3>{{ summary.totalDays }}</h3>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-success text-white">
            <div class="card-body">
              <h5 class="card-title">Present Days</h5>
              <h3>{{ summary.presentDays }}</h3>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-warning text-white">
            <div class="card-body">
              <h5 class="card-title">Absent Days</h5>
              <h3>{{ summary.absentDays }}</h3>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-info text-white">
            <div class="card-body">
              <h5 class="card-title">Late Days</h5>
              <h3>{{ summary.lateDays }}</h3>
            </div>
          </div>
        </div>
      </div>

      <!-- Report Table -->
      <div class="card">
        <div class="card-header bg-secondary text-white">
          <h5 class="mb-0">Detailed Report</h5>
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

          <div v-else-if="reportData.length === 0" class="alert alert-info">
            No attendance records found for the selected criteria.
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
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="record in reportData" :key="record.id">
                  <td>{{ formatDate(record.date) }}</td>
                  <td>{{ record.employeeName }}</td>
                  <td>{{ record.checkIn ? formatTime(record.checkIn) : '-' }}</td>
                  <td>{{ record.checkOut ? formatTime(record.checkOut) : '-' }}</td>
                  <td>{{ record.totalHours || '-' }}</td>
                  <td>
                    <span :class="getStatusBadge(record.status)">
                      {{ record.status }}
                    </span>
                  </td>
                  <td>{{ record.notes || '-' }}</td>
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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AttendanceReport',
  components: {
    Layout
  },
  data() {
    return {
      filters: {
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        employeeId: '',
        status: ''
      },
      employees: [
        { id: 'emp001', name: 'John Doe' },
        { id: 'emp002', name: 'Jane Smith' },
        { id: 'emp003', name: 'Mike Johnson' }
      ],
      reportData: [],
      summary: {
        totalDays: 0,
        presentDays: 0,
        absentDays: 0,
        lateDays: 0
      },
      loading: false,
      error: null,
      loadingCheckIn: false,
      loadingCheckOut: false,
      isCheckedIn: false,
      currentUser: null,
      todayAttendance: null
    };
  },
  computed: {
    ...mapGetters('attendance', ['allAttendances']),
    ...mapGetters('auth', ['user']),
    
    getCurrentUserId() {
      return this.user?.id || localStorage.getItem('userId') || 'current-user-id';
    }
  },
  methods: {
    ...mapActions('attendance', ['fetchAttendances']),
    
    async generateReport() {
      this.loading = true;
      try {
        await this.fetchAttendances();
        this.processReportData();
        this.updateTodayAttendance();
      } catch (error) {
        this.error = 'Failed to generate report';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    
    updateTodayAttendance() {
      const today = new Date().toISOString().split('T')[0];
      const currentUserId = this.getCurrentUserId;
      
      // Find today's attendance for current user
      this.todayAttendance = this.allAttendances.find(record => {
        const matchesDate = record.date === today;
        const matchesUser = record.employeeId === currentUserId || 
                          record.user?.id === currentUserId || 
                          record.employeeEmail === this.user?.email;
        return matchesDate && matchesUser;
      }) || null;
      
      // Update check-in status
      this.isCheckedIn = this.todayAttendance && this.todayAttendance.checkIn ? true : false;
      this.currentUser = this.user;
      
      console.log('Updated today attendance:', this.todayAttendance);
      console.log('Is checked in:', this.isCheckedIn);
    },
    
    processReportData() {
      // Filter data based on filters
      let filteredData = this.allAttendances.filter(record => {
        const recordDate = new Date(record.date);
        const startDate = new Date(this.filters.startDate);
        const endDate = new Date(this.filters.endDate);
        
        return recordDate >= startDate && recordDate <= endDate;
      });

      // Process data for report
      this.reportData = filteredData.map(record => ({
        id: record.id,
        date: record.date,
        employeeName: this.getEmployeeName(record.employeeId),
        checkIn: record.checkIn,
        checkOut: record.checkOut,
        totalHours: record.totalHours,
        status: this.getStatus(record),
        notes: record.notes || ''
      }));

      // Calculate summary
      this.calculateSummary();
    },
    
    calculateSummary() {
      this.summary.totalDays = this.reportData.length;
      this.summary.presentDays = this.reportData.filter(r => r.status === 'present').length;
      this.summary.absentDays = this.reportData.filter(r => r.status === 'absent').length;
      this.summary.lateDays = this.reportData.filter(r => r.status === 'late').length;
    },
    
    getEmployeeName(employeeId) {
      const employee = this.employees.find(e => e.id === employeeId);
      return employee ? employee.name : 'Unknown';
    },
    
    getStatus(record) {
      if (record.checkIn && record.checkOut) {
        return 'present';
      } else if (record.checkIn && !record.checkOut) {
        return 'present';
      } else {
        return 'absent';
      }
    },
    
    getStatusBadge(status) {
      const badges = {
        present: 'badge bg-success',
        absent: 'badge bg-danger',
        late: 'badge bg-warning',
        'half-day': 'badge bg-info'
      };
      return badges[status] || 'badge bg-secondary';
    },
    
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    },
    
    formatTime(dateTimeString) {
      if (!dateTimeString) return '-';
      return new Date(dateTimeString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    
    async handleCheckIn() {
      this.loadingCheckIn = true;
      try {
        const checkInData = {
          employeeId: this.getCurrentUserId,
          location: 'Office',
          date: new Date().toISOString().split('T')[0],
          checkIn: new Date().toISOString()
        };
        
        // This would typically call an API
        console.log('Check-in data:', checkInData);
        alert('Check-in functionality would be implemented here');
        
        await this.generateReport(); // Refresh data
      } catch (error) {
        console.error('Check-in failed:', error);
      } finally {
        this.loadingCheckIn = false;
      }
    },
    
    async handleCheckOut() {
      this.loadingCheckOut = true;
      try {
        const checkOutData = {
          employeeId: this.getCurrentUserId,
          date: new Date().toISOString().split('T')[0],
          checkOut: new Date().toISOString()
        };
        
        // This would typically call an API
        console.log('Check-out data:', checkOutData);
        alert('Check-out functionality would be implemented here');
        
        await this.generateReport(); // Refresh data
      } catch (error) {
        console.error('Check-out failed:', error);
      } finally {
        this.loadingCheckOut = false;
      }
    },
    
    exportToExcel() {
      alert('Export to Excel functionality would be implemented here');
    },
    
    exportToPDF() {
      alert('Export to PDF functionality would be implemented here');
    }
  },
  async mounted() {
    await this.generateReport();
  }
};
</script>

<style scoped>
.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.btn {
  min-width: 120px;
}

.table th {
  border-top: none;
  font-weight: 600;
}

.badge {
  font-size: 0.875em;
}
</style>
