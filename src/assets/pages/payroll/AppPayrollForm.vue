<template>
  <div>
    <!-- Modal -->
    <div class="modal fade show d-block" tabindex="-1" role="dialog" v-if="visible">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ mode === 'add' ? 'Add New' : 'Edit' }} Payroll</h5>
            <button type="button" class="btn-close" @click="close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">User ID <span class="text-danger">*</span></label>
                  <input
                    v-model="formData.user_id"
                    type="text"
                    class="form-control"
                    required
                  >
                </div>
                <div class="col-md-6">
                  <label class="form-label">Basic Pay <span class="text-danger">*</span></label>
                  <input
                    v-model="formData.basic_pay"
                    type="number"
                    step="0.01"
                    min="0"
                    class="form-control"
                    required
                  >
                </div>
                <div class="col-md-6">
                  <label class="form-label">Bonuses</label>
                  <input
                    v-model="formData.bonuses"
                    type="number"
                    step="0.01"
                    min="0"
                    class="form-control"
                  >
                </div>
                <div class="col-md-6">
                  <label class="form-label">Pay Date <span class="text-danger">*</span></label>
                  <input
                    v-model="formData.pay_date"
                    type="date"
                    class="form-control"
                    required
                  >
                </div>
              </div>
              <div class="modal-footer mt-4">
                <button type="button" class="btn btn-secondary" @click="close">
                  Cancel
                </button>
                <button type="submit" class="btn btn-primary">
                  {{ mode === 'add' ? 'Create' : 'Update' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Backdrop -->
    <div class="modal-backdrop fade show" v-if="visible"></div>
  </div>
</template>

<script>
export default {
  props: {
    payroll: {
      type: Object,
      default: () => ({})
    },
    mode: {
      type: String,
      default: 'add',
      validator: value => ['add', 'edit'].includes(value)
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        user_id: '',
        basic_pay: '',
        bonuses: '',
        pay_date: new Date().toISOString().split('T')[0]
      }
    };
  },
  watch: {
    payroll: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.formData = {
            user_id: newVal.user_id || '',
            basic_pay: newVal.basic_pay || '',
            bonuses: newVal.bonuses || '',
            pay_date: newVal.pay_date || new Date().toISOString().split('T')[0]
          };
        }
      }
    }
  },
  methods: {
    submitForm() {
      this.$emit('save', {
        user_id: this.formData.user_id,
        basic_pay: this.formData.basic_pay,
        bonuses: this.formData.bonuses,
        pay_date: this.formData.pay_date,
        net_salary: (parseFloat(this.formData.basic_pay || 0) + 
                    parseFloat(this.formData.bonuses || 0)).toFixed(2)
      });
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.modal {
  z-index: 1050;
  pointer-events: auto;
}
.modal-backdrop {
  z-index: 1040;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-content {
  pointer-events: auto;
}
</style>
