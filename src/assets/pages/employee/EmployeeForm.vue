<template>
  <div class="modal-overlay" v-if="visible">
    <div class="modal">
      <h3>{{ isEdit ? 'Edit' : 'Add' }} Employee</h3>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Name:</label>
          <input v-model="form.name" required />
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input v-model="form.email" type="email" required />
        </div>
        <div class="form-group">
          <label>Phone:</label>
          <input v-model="form.phone" required />
        </div>
        <div class="form-group">
          <label>Role:</label>
          <input v-model="form.role" />
        </div>
        <div class="form-group">
          <label>Skills:</label>
          <input v-model="form.skills" />
        </div>
        <div class="form-group">
          <label>Status:</label>
          <select v-model="form.is_active">
            <option :value="true">Active</option>
            <option :value="false">Inactive</option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary">
          {{ isEdit ? 'Update' : 'Add' }} Employee
        </button>
        <button type="button" class="btn btn-secondary" @click="closeForm">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    employee: Object,
    visible: Boolean
  },
  data() {
    return {
      form: {
        id: null,
        name: '',
        email: '',
        phone: '',
        role: '',
        skills: '',
        is_active: true
      }
    }
  },
  computed: {
    isEdit() {
      return !!this.form.id
    }
  },
  watch: {
    employee: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.form = { ...newVal }
        } else {
          this.resetForm()
        }
      }
    }
  },
  methods: {
    ...mapActions('employee', ['updateEmployee']),
    async handleSubmit() {
      try {
        await this.updateEmployee(this.form)
        this.$emit('success') // Notify parent to reload
        this.closeForm()
      } catch (err) {
        console.error('Update failed:', err)
      }
    },
    closeForm() {
      this.$emit('close')
      this.resetForm()
    },
    resetForm() {
      this.form = {
        id: null,
        name: '',
        email: '',
        phone: '',
        role: '',
        skills: '',
        is_active: true
      }
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
}
.form-group {
  margin-bottom: 15px;
}
</style>
<style scoped>
.employee-form-container {
  width: 100%;
  padding: 20px;
}
.form-group {
  margin-bottom: 15px;
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
