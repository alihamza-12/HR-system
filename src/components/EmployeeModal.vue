<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <h2>{{ isEdit ? 'Edit Employee' : 'Add Employee' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Name:</label>
          <input v-model="localEmployee.name" type="text" required />
        </div>

        <div class="form-group">
          <label>Email:</label>
          <input v-model="localEmployee.email" type="email" required />
        </div>

        <div class="form-group">
          <label>Phone:</label>
          <input v-model="localEmployee.phone" type="text" required />
        </div>

        <div class="form-group">
          <label>Role:</label>
          <input v-model="localEmployee.role" type="text" />
        </div>

        <div class="form-group">
          <label>Skills:</label>
          <input v-model="localEmployee.skills" type="text" placeholder="e.g. Vue, Node.js" />
        </div>

        <div class="form-group">
          <label>Status:</label>
          <select v-model="localEmployee.is_active">
            <option :value="true">Active</option>
            <option :value="false">Inactive</option>
          </select>
        </div>

        <div class="form-group">
          <label>CV:</label>
          <input type="file" @change="handleFileChange('cv', $event)" />
        </div>

        <div class="form-group">
          <label>Contract:</label>
          <input type="file" @change="handleFileChange('contract', $event)" />
        </div>

        <div class="modal-actions">
          <button type="submit" class="btn-submit">{{ isEdit ? 'Update' : 'Add' }}</button>
          <button type="button" class="btn-cancel" @click="$emit('close')">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    isEdit: Boolean,
    employee: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      localEmployee: {
        name: '',
        email: '',
        phone: '',
        role: '',
        is_active: true,
        skills: '',
        resume: null,
        contract: null
      }
    };
  },
  watch: {
    employee: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.localEmployee = { ...newVal };
      }
    }
  },
  methods: {
    handleFileChange(field, event) {
      const file = event.target.files[0];
      if (file) {
        this.localEmployee[field] = file;
      }
    },
    handleSubmit() {
      const formData = new FormData();
      
      // Ensure all required fields are included with proper validation
      if (!this.localEmployee.name?.trim()) {
        alert('Name is required');
        return;
      }
      if (!this.localEmployee.email?.trim()) {
        alert('Email is required');
        return;
      }
      if (!this.localEmployee.phone?.trim()) {
        alert('Phone is required');
        return;
      }

      // Append all fields with proper type conversion
      formData.append('name', this.localEmployee.name.trim());
      formData.append('email', this.localEmployee.email.trim());
      formData.append('phone', this.localEmployee.phone.trim());
      formData.append('role', this.localEmployee.role?.trim() || '');
      formData.append('skills', this.localEmployee.skills?.trim() || '');
      
      // Convert boolean to string for FormData
      formData.append('is_active', this.localEmployee.is_active ? '1' : '0');
      
      // Handle file uploads
      if (this.localEmployee.cv) {
        formData.append('cv', this.localEmployee.cv);
      }
      if (this.localEmployee.contract) {
        formData.append('contract', this.localEmployee.contract);
      }

      // Log form data for debugging
      console.log('Form data being sent:', {
        name: this.localEmployee.name,
        email: this.localEmployee.email,
        phone: this.localEmployee.phone,
        role: this.localEmployee.role,
        skills: this.localEmployee.skills,
        is_active: this.localEmployee.is_active
      });

      this.$emit('save-success', formData);
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
  z-index: 9999;
}

.modal-content {
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

h2 {
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input[type='text'],
input[type='email'],
input[type='file'],
select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn-submit {
  background-color: #28a745;
  color: #fff;
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-cancel {
  background-color: #dc3545;
  color: #fff;
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

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
  z-index: 9999;
  overflow: auto;
}

.modal-content {
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh; /* So it doesn’t go beyond screen */
  overflow-y: auto; /* Enables scrolling */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

h2 {
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input[type='text'],
input[type='email'],
input[type='file'],
select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn-submit {
  background-color: #28a745;
  color: #fff;
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-cancel {
  background-color: #dc3545;
  color: #fff;
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>

