<template>
  <div class="card">
    <div class="card-header bg-danger text-white">
      <h5 class="mb-0">Check Out</h5>
    </div>
    <div class="card-body">
      <form @submit.prevent="handleCheckOut">
        <div class="mb-3">
          <label class="form-label">Notes (Optional)</label>
          <textarea 
            v-model="checkOutForm.notes" 
            class="form-control" 
            rows="2"
            placeholder="Any notes about your work day..."
          ></textarea>
        </div>
        
        <button type="submit" class="btn btn-danger" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          Check Out
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AttendanceCheckOut',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checkOutForm: {
        notes: ''
      }
    };
  },
  methods: {
    handleCheckOut() {
      this.$emit('check-out', this.checkOutForm);
      this.checkOutForm.notes = '';
    }
  }
};
</script>
