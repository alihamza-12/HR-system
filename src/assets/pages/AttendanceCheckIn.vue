<template>
  <div class="card">
    <div class="card-header bg-success text-white">
      <h5 class="mb-0">
        {{ hasCheckedIn && !hasCheckedOut ? 'Check Out' : 'Check In' }}
      </h5>
    </div>
    <div class="card-body">
      <!-- Show Check In Form if not checked in OR already checked out -->
      <form v-if="!hasCheckedIn || hasCheckedOut" @submit.prevent="handleCheckIn">
        <div class="mb-3">
          <label class="form-label">Location</label>
          <input 
            v-model="checkInForm.location" 
            type="text" 
            class="form-control" 
            placeholder="Enter location (e.g., Office, Home)"
            required
          />
        </div>
        
        <div class="mb-3">
          <label class="form-label">Notes (Optional)</label>
          <textarea 
            v-model="checkInForm.notes" 
            class="form-control" 
            rows="2"
            placeholder="Any additional notes..."
          ></textarea>
        </div>
        
        <button type="submit" class="btn btn-success" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          Check In
        </button>
      </form>

      <!-- Show Check Out Button if checked in but not yet checked out -->
      <div v-else>
        <button @click="$emit('check-out')" class="btn btn-danger" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          Check Out
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AttendanceCheckIn',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    todayAttendance: {
      type: Object,
      default: null
    }
  },
  computed: {
    hasCheckedIn() {
      return this.todayAttendance && this.todayAttendance.checkIn;
    },
    hasCheckedOut() {
      return this.todayAttendance && this.todayAttendance.checkOut;
    }
  },
  data() {
    return {
      checkInForm: {
        location: 'Office',
        notes: ''
      }
    };
  },
  methods: {
    handleCheckIn() {
      this.$emit('check-in', this.checkInForm);
      this.checkInForm.notes = '';
    }
  }
};
</script>
