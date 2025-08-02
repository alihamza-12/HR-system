<template>
  <Layout>
    <template v-slot>
      <div class="employee-form-container">
        <h1>Employee Form</h1>
        <div class="employee-form-content">
          <form @submit.prevent="handleSubmit" class="employee-form">
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First Name *</label>
                <input 
                  type="text" 
                  id="firstName" 
                  v-model="formData.firstName" 
                  placeholder="Enter first name"
                  :class="{ 'error': errors.firstName }"
                >
                <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
              </div>
              <div class="form-group">
                <label for="lastName">Last Name *</label>
                <input 
                  type="text" 
                  id="lastName" 
                  v-model="formData.lastName" 
                  placeholder="Enter last name"
                  :class="{ 'error': errors.lastName }"
                >
                <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="email">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="formData.email" 
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
                  v-model="formData.phone" 
                  placeholder="Enter phone number"
                >
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="position">Position *</label>
                <select 
                  id="position" 
                  v-model="formData.position"
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
                <label for="department">Department *</label>
                <select 
                  id="department" 
                  v-model="formData.department"
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
                <label for="startDate">Start Date *</label>
                <input 
                  type="date" 
                  id="startDate" 
                  v-model="formData.startDate"
                  :class="{ 'error': errors.startDate }"
                >
                <span v-if="errors.startDate" class="error-message">{{ errors.startDate }}</span>
              </div>
              <div class="form-group">
                <label for="salary">Salary *</label>
                <input 
                  type="number" 
                  id="salary" 
                  v-model="formData.salary" 
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
                v-model="formData.address" 
                placeholder="Enter full address" 
                rows="3"
              ></textarea>
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
                <div v-if="formData.resumePreview" class="file-preview">
                  <p>Resume: {{ formData.resumePreview }}</p>
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
                <div v-if="formData.contractPreview" class="file-preview">
                  <p>Contract: {{ formData.contractPreview }}</p>
                </div>
              </div>
            </div>
            
            <div class="form-actions">
              <button type="submit" class="submit-button" :disabled="isSubmitting">
                {{ isSubmitting ? 'Saving...' : 'Save Employee' }}
              </button>
              <button type="button" class="reset-button" @click="resetForm">Reset</button>
            </div>
          </form>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue';

export default {
  name: 'EmployeeForm',
  components: {
    Layout
  },
  data() {
    return {
      isSubmitting: false,
      formData: {
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
    }
  },
  methods: {
    handleFileUpload(event, fileType) {
      const file = event.target.files[0];
      if (file) {
        // Store the file for upload
        this.formData[fileType] = file;
        // Create a preview name
        this.formData[`${fileType}Preview`] = file.name;
      }
    },
    validateForm() {
      this.errors = {};
      
      if (!this.formData.firstName) {
        this.errors.firstName = 'First name is required';
      }
      
      if (!this.formData.lastName) {
        this.errors.lastName = 'Last name is required';
      }
      
      if (!this.formData.email) {
        this.errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(this.formData.email)) {
        this.errors.email = 'Email is invalid';
      }
      
      if (!this.formData.position) {
        this.errors.position = 'Position is required';
      }
      
      if (!this.formData.department) {
        this.errors.department = 'Department is required';
      }
      
      if (!this.formData.startDate) {
        this.errors.startDate = 'Start date is required';
      }
      
      if (!this.formData.salary) {
        this.errors.salary = 'Salary is required';
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
        formData.append('firstName', this.formData.firstName);
        formData.append('lastName', this.formData.lastName);
        formData.append('email', this.formData.email);
        formData.append('phone', this.formData.phone);
        formData.append('position', this.formData.position);
        formData.append('department', this.formData.department);
        formData.append('startDate', this.formData.startDate);
        formData.append('salary', this.formData.salary);
        formData.append('address', this.formData.address);
        
        if (this.formData.resume) {
          formData.append('resume', this.formData.resume);
        }
        
        if (this.formData.contract) {
          formData.append('contract', this.formData.contract);
        }
        
        // In a real app, you would send this to your API
        // For now, we'll simulate the API call
        await this.simulateApiCall(formData);
        
        // Show success message
        alert('Employee saved successfully!');
        this.resetForm();
      } catch (error) {
        console.error('Error saving employee:', error);
        alert('Error saving employee. Please try again.');
      } finally {
        this.isSubmitting = false;
      }
    },
    simulateApiCall() {
      // Simulate API call delay
      return new Promise(resolve => setTimeout(resolve, 1000));
    },
    resetForm() {
      this.formData = {
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
}
</script>

<style scoped>
.employee-form-container {
  width: 100%;
  padding: 20px;
}

.employee-form-content {
  margin-top: 20px;
}

.employee-form {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
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
