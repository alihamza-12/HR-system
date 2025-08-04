<template>
  <Layout>
    <div class="container mt-4">
      <h2 class="text-center mb-4">Attendance</h2>

      <!-- Dropdown to select section -->
      <div class="form-group">
        <label>Select Option:</label>
        <select v-model="selectedOption" class="form-control">
          <option value="">-- Select --</option>
          <option value="leave">Leave Request</option>
          <option value="report">Attendance Report</option>
        </select>
      </div>

      <!-- Leave Request Form -->
      <div v-if="selectedOption === 'leave'" class="mt-4 p-3 border rounded bg-light">
        <h4>Leave Request</h4>

        <div class="form-group">
          <label for="leaveType">Leave Type:</label>
          <select v-model="leaveType" class="form-control">
            <option disabled value="">-- Choose Leave Type --</option>
            <option value="annual">Annual Leave ({{ leaveBalance.annual }})</option>
            <option value="sick">Sick Leave ({{ leaveBalance.sick }})</option>
            <option value="casual">Casual Leave ({{ leaveBalance.casual }})</option>
          </select>
        </div>

        <div class="form-group">
          <label for="reason">Reason:</label>
          <input
            v-model="reason"
            type="text"
            class="form-control"
            placeholder="Enter your reason"
          />
        </div>

        <button class="btn btn-primary" @click="applyLeave">Apply</button>
      </div>

      <!-- Attendance Report -->
      <div v-if="selectedOption === 'report'" class="mt-4 p-3 border rounded bg-light">
        <h4>Attendance Report</h4>
        <div class="table-responsive">
          <table class="table table-bordered text-center">
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="entry in attendanceReport" :key="entry.date">
                <td>{{ entry.date }}</td>
                <td>
                  <span :class="{
                    'text-success': entry.status === 'Present',
                    'text-danger': entry.status === 'Absent'
                  }">
                    {{ entry.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue'; // ✅ Make sure this path is correct

export default {
  name: 'AttendendanReport',
  components: {
    Layout
  },
  data() {
    return {
      selectedOption: '',
      leaveType: '',
      reason: '',
      leaveBalance: {
        annual: 14,
        sick: 7,
        casual: 5
      },
      attendanceReport: [
        { date: '2025-08-01', status: 'Present' },
        { date: '2025-08-02', status: 'Absent' },
        { date: '2025-08-03', status: 'Present' },
        { date: '2025-08-04', status: 'Present' },
        { date: '2025-08-05', status: 'Absent' }
      ]
    };
  },
  methods: {
    applyLeave() {
      if (!this.leaveType || !this.reason) {
        alert('Please fill all fields');
        return;
      }

      if (this.leaveBalance[this.leaveType] <= 0) {
        alert(`You have no remaining ${this.leaveType} leaves.`);
        return;
      }

      this.leaveBalance[this.leaveType]--;
      alert('Leave applied successfully!');
      this.leaveType = '';
      this.reason = '';
    }
  }
};
</script>

<style scoped>
h2, h4 {
  color: #343a40;
}

.table {
  background-color: white;
}

.table th,
.table td {
  vertical-align: middle;
}
</style>
