<template>
  <div class="modal-overlay" v-if="isVisible">
    <div class="modal-container">
      <div class="modal-header">
        <h2>{{ isEditMode ? 'Edit Employee' : 'Add New Employee' }}</h2>
        <button class="close-button" @click="closeModal">×</button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="handleSubmit" class="employee-form">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input 
                type="text" 
                id="firstName" 
                v-model="employeeData.firstName" 
                placeholder="Enter first name"
                :class="{ 'error': errors.firstName }"
              >
              <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
            </div>
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                v-model="employeeData.lastName" 
                placeholder="Enter last name"
                :class="{ 'error': errors.lastName }"
              >
              <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email" 
                v-model="employeeData.email" 
                placeholder="Enter email address"
                :class="{ 'error': errors.email }"
              >
              <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </div>
            <div class="form-group">
              <label for="phone">Phone</label>
              <input 
                type="tel" 
                id="phone" 
                v-model="employeeData.phone" 
                placeholder="Enter phone number"
                :class="{ 'error': errors.phone }"
              >
              <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="position">Position</label>
              <select 
                id="position" 
                v-model="employeeData.position"
                :class="{ 'error': errors.position }"
              >
                <option value="">Select position</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="manager">Manager</option>
                <option value="hr">HR</option>
              </select>
              <span v-if="errors.position" class="error-message">{{ errors.position }}</span>
            </div>
            <div class="form-group">
              <label for="department">Department</label>
              <select 
                id="department" 
                v-model="employeeData.department"
                :class="{ 'error': errors.department }"
              >
                <option value="">Select department</option>
                <option value="it">IT</option>
                <option value="hr">Human Resources</option>
                <option value="finance">Finance</option>
                <option value="marketing">Marketing</option>
              </select>
              <span v-if="errors.department" class="error-message">{{ errors.department }}</span>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="startDate">Start Date</label>
              <input 
                type="date" 
                id="startDate" 
                v-model="employeeData.startDate"
                :class="{ 'error': errors.startDate }"
              >
              <span v-if="errors.startDate" class="error-message">{{ errors.startDate }}</span>
            </div>
            <div class="form-group">
              <label for="salary">Salary</label>
              <input 
                type="number" 
                id="salary" 
                v-model="employeeData.salary" 
                placeholder="Enter salary"
                :class="{ 'error': errors.salary }"
              >
              <span v-if="errors.salary" class="error-message">{{ errors.salary }}</span>
            </div>
          </div>
          
          <div class="form-group full-width">
            <label for="address">Address</label>
            <textarea 
              id="address" 
              v-model="employeeData.address" 
              placeholder="Enter full address" 
              rows="3"
              :class="{ 'error': errors.address }"
            ></textarea>
            <span v-if="errors.address" class="error-message">{{ errors.address }}</span>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="resume">Resume</label>
              <input 
                type="file" 
                id="resume" 
                @change="handleFileUpload($event, 'resume')"
                accept=".pdf,.doc,.docx"
              >
              <div v-if="employeeData.resumePreview" class="file-preview">
                <p>Resume: {{ employeeData.resumePreview }}</p>
              </div>
            </div>
            <div class="form-group">
              <label for="contract">Contract</label>
              <input 
                type="file" 
                id="contract" 
                @change="handleFileUpload($event, 'contract')"
                accept=".pdf,.doc,.docx"
              >
              <div v-if="employeeData.contractPreview" class="file-preview">
                <p>Contract: {{ employeeData.contractPreview }}</p>
              </div>
            </div>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="submit-button" :disabled="isSubmitting">
              {{ isSubmitting ? 'Saving...' : (isEditMode ? 'Update Employee' : 'Save Employee') }}
            </button>
            <button type="button" class="reset-button" @click="resetForm">Reset</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'EmployeeModal',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    isEditMode: {
      type: Boolean,
      default: false
    },
    employee: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isSubmitting: false,
      employeeData: {
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        startDate: '',
        salary: '',
        address: '',
        resume: null,
        contract: null,
        resumePreview: '',
        contractPreview: ''
      },
      errors: {}
    };
  },
  watch: {
    employee: {
      handler(newEmployee) {
        if (newEmployee && Object.keys(newEmployee).length > 0) {
          this.employeeData = { ...newEmployee };
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('employee', ['addEmployee', 'updateEmployee']),
    closeModal() {
      this.$emit('close');
    },
    handleFileUpload(event, fileType) {
      const file = event.target.files[0];
      if (file) {
        // Store the file for upload
        this.employeeData[fileType] = file;
        // Create a preview name
        this.employeeData[`${fileType}Preview`] = file.name;
      }
    },
    validateForm() {
      this.errors = {};
      
      if (!this.employeeData.firstName) {
        this.errors.firstName = 'First name is required';
      }
      
      if (!this.employeeData.lastName) {
        this.errors.lastName = 'Last name is required';
      }
      
      if (!this.employeeData.email) {
        this.errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(this.employeeData.email)) {
        this.errors.email = 'Email is invalid';
      }
      
      if (!this.employeeData.position) {
        this.errors.position = 'Position is required';
      }
      
      if (!this.employeeData.department) {
        this.errors.department = 'Department is required';
      }
      
      return Object.keys(this.errors).length === 0;
    },
    async handleSubmit() {
      if (!this.validateForm()) {
        return;
      }
      
      this.isSubmitting = true;
      
      try {
        // Prepare form data for file upload
        const formData = new FormData();
        formData.append('firstName', this.employeeData.firstName);
        formData.append('lastName', this.employeeData.lastName);
        formData.append('email', this.employeeData.email);
        formData.append('phone', this.employeeData.phone);
        formData.append('position', this.employeeData.position);
        formData.append('department', this.employeeData.department);
        formData.append('startDate', this.employeeData.startDate);
        formData.append('salary', this.employeeData.salary);
        formData.append('address', this.employeeData.address);
        
        if (this.employeeData.resume) {
          formData.append('resume', this.employeeData.resume);
        }
        
        if (this.employeeData.contract) {
          formData.append('contract', this.employeeData.contract);
        }
        
        // Add ID for edit mode
        if (this.isEditMode && this.employeeData.id) {
          formData.append('id', this.employeeData.id);
        }
        
        // In a real app, you would send this to your API
        // For now, we'll simulate the API call
        await this.simulateApiCall(formData);
        
        // Add or update employee in store
        if (this.isEditMode) {
          this.updateEmployee(this.employeeData);
        } else {
          this.addEmployee(this.employeeData);
        }
        
        this.closeModal();
        this.resetForm();
      } catch (error) {
        console.error('Error saving employee:', error);
        // Handle error (show message to user)
      } finally {
        this.isSubmitting = false;
      }
    },
    simulateApiCall() {
      // Simulate API call delay
      return new Promise(resolve => setTimeout(resolve, 1000));
    },
    resetForm() {
      this.employeeData = {
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        startDate: '',
        salary: '',
        address: '',
        resume: null,
        contract: null,
        resumePreview: '',
        contractPreview: ''
      };
      this.errors = {};
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  margin: 0;
  color: #333;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  color: #333;
}

.modal-body {
  padding: 20px;
}

.employee-form {
  background-color: white;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  flex: 100%;
}

label {
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

input, select, textarea {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

input.error, select.error, textarea.error {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 14px;
  margin-top: 5px;
}

.form-actions {
  display: flex;
  justify-content: flex-start;
  gap: 15px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.submit-button {
  padding: 12px 30px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
}

.submit-button:hover:not(:disabled) {
  background-color: #218838;
  /* transform: translateY(-2px); */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.submit-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.reset-button {
  padding: 12px 30px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
}

.reset-button:hover {
  background-color: #5a6268;
  /* transform: translateY(-2px); */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.file-preview {
  margin-top: 8px;
  padding: 8px;
  background-color: #f8f9fa;
  border-radius: 4px;
  font-size: 14px;
}
</style>
