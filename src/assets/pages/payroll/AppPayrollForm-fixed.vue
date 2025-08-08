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
                  <label class="form-label">Employee <span class="text-danger">*</span></label>
                  <select 
                    v-model="formData.user_id" 
                    class="form-select" 
                    required
                    @change="onEmployeeChange"
                  >
                    <option value="">Select Employee</option>
                    <option v-for="employee in employees" :key="employee.id" :value="employee.id">
                      {{ employee.name }} ({{ employee.employee_id }})
                    </option>
                  </select>
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
                    :readonly="selectedEmployee"
                  >
                </div>
                <div class="col-md-6">
                  <label class="form-label">Allowances</label>
                  <input
                    v-model="formData.allowances"
                    type="number"
                    step="0.01"
                    min="0"
                    class="form-control"
                    placeholder="0.00"
                  >
                </div>
                <div class="col-md-6">
                  <label class="form-label">Deductions</label>
                  <input
                    v-model="formData.deductions"
                    type="number"
                    step="0.01"
                    min="0"
                    class="form-control"
                    placeholder="0.00"
                  >
                </div>
                <div class="col-md-6">
                  <label class="form-label">Bonus</label>
                  <input
                    v-model="formData.bonus"
                    type="number"
                    step="0.01"
                    min="0"
                    class="form-control"
                    placeholder="0.00"
                  >
                </div>
                <div class="col-md-6">
                  <label class="form-label">Pay Date <span class="text-danger">*</span></label>
                  <input
                    v-model="formData.pay_date"
                    type="month"
                    class="form-control"
                    required
                  >
                </div>
                <div class="col-md-12">
                  <label class="form-label">Notes</label>
                  <textarea
                    v-model="formData.notes"
                    class="form-control"
                    rows="2"
                    placeholder="Additional notes..."
                  ></textarea>
                </div>
              </div>
              
              <!-- Calculated Fields -->
              <div class="row g-3 mt-3">
                <div class="col-md-6">
                  <label class="form-label">Gross Salary</label>
                  <input
                    :value="calculateGrossSalary"
                    type="text"
                    class="form-control"
                    readonly
                  >
                </div>
                <div class="col-md-6">
                  <label class="form-label">Net Salary</label>
                  <input
                    :value="calculateNetSalary"
                    type="text"
                    class="form-control"
                    readonly
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
import { mapState } from 'vuex';

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
        allowances: 0,
        deductions: 0,
        bonus: 0,
        pay_date: '',
        notes: ''
      },
      selectedEmployee: null
    };
  },
  computed: {
    ...mapState('employee', ['employees']),
    
    calculateGrossSalary() {
      const basic = parseFloat(this.formData.basic_pay) || 0;
      const allowances = parseFloat(this.formData.allowances) || 0;
      const bonus = parseFloat(this.formData.bonus) || 0;
      return (basic + allowances + bonus).toFixed(2);
    },
    
    calculateNetSalary() {
      const gross = parseFloat(this.calculateGrossSalary) || 0;
      const deductions = parseFloat(this.formData.deductions) || 0;
      return (gross - deductions).toFixed(2);
    }
  },
  watch: {
    payroll: {
      immediate: true,
      handler(newVal) {
        if (newVal && Object.keys(newVal).length > 0) {
          this.formData = {
            user_id: newVal.user_id || newVal['User ID'] || '',
            basic_pay: newVal.basic_pay || newVal['Basic Pay'] || newVal.basic_salary || '',
            allowances: newVal.allowances || newVal['Allowances'] || 0,
            deductions: newVal.deductions || newVal['Deductions'] || 0,
            bonus: newVal.bonus || newVal['Bonus'] || 0,
            pay_date: newVal.pay_date || newVal['Pay Period'] || newVal.pay_period || '',
            notes: newVal.notes || ''
          };
          this.selectedEmployee = this.employees.find(e => e.id === this.formData.user_id);
        } else {
          this.resetForm();
        }
      }
    }
  },
  methods: {
    resetForm() {
      this.formData = {
        user_id: '',
        basic_salary: '',
        allowances: 0,
        deductions: 0,
        bonus: 0,
        pay_period: '',
        notes: ''
      };
      this.selectedEmployee = null;
    },
    
    onEmployeeChange() {
      this.selectedEmployee = this.employees.find(e => e.id === this.formData.user_id);
      if (this.selectedEmployee && this.selectedEmployee.salary) {
        this.formData.basic_salary = this.selectedEmployee.salary;
      }
    },
    
    submitForm() {
      const payrollData = {
        user_id: this.formData.user_id,
        basic_pay: parseFloat(this.formData.basic_pay),
        allowances: parseFloat(this.formData.allowances),
        deductions: parseFloat(this.formData.deductions),
        bonus: parseFloat(this.formData.bonus),
        pay_date: this.formData.pay_date,
        notes: this.formData.notes,
        gross_salary: parseFloat(this.calculateGrossSalary),
        net_salary: parseFloat(this.calculateNetSalary)
      };
      
      this.$emit('save', payrollData);
    },
    
    close() {
      this.resetForm();
      this.$emit('close');
    }
  },
  mounted() {
    // Load employees if not already loaded
    if (!this.employees || this.employees.length === 0) {
      this.$store.dispatch('employee/fetchEmployees');
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
</style>
