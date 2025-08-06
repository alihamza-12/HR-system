<template>
  <Layout>
    <div class="container mt-4" v-if="employeeData">
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="mb-0">{{ employeeData.name }}'s Profile</h5>
          <button @click="goBack" class="btn btn-sm btn-secondary">Back to List</button>
        </div>
        <div class="card-body">
          <p><strong>ID:</strong> {{ employeeData.id }}</p>
          <p><strong>Email:</strong> {{ employeeData.email }}</p>
          <p><strong>Phone:</strong> {{ employeeData.phone }}</p>
          <p><strong>Role:</strong> {{ employeeData.role }}</p>
          <p><strong>Skills:</strong> {{ employeeData.skills || 'N/A' }}</p>
          <p><strong>Status:</strong> {{ employeeData.is_active ? 'Active' : 'Inactive' }}</p>

          <hr />

          <div v-if="employeeData.resumePreview">
            <h6>Resume:</h6>
            <a :href="employeeData.resumePreview" target="_blank">View Resume</a>
          </div>

          <div v-if="employeeData.contractPreview">
            <h6>Contract:</h6>
            <a :href="employeeData.contractPreview" target="_blank">View Contract</a>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'EmployeeProfile',
  components: {
    Layout
  },
  computed: {
    ...mapGetters('employee', ['getEmployeeById']),
    employeeData() {
      const id = this.$route.params.id;
      const employee = this.getEmployeeById(id);
      return employee || null;
    }
  },
  methods: {
    goBack() {
      this.$router.push('/employee/list' ); 
    }
  }
};
</script>

<style scoped>
.card {
  max-width: 700px;
  margin: auto;
}
</style>



<style scoped>
.employee-profile-container {
  width: 100%;
  padding: 20px;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-section h1 {
  margin: 0;
}

.profile-actions {
  display: flex;
  gap: 10px;
}

.employee-profile-content {
  margin-top: 20px;
}

.profile-header {
  display: flex;
  align-items: center;
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  margin-bottom: 30px;
}

.profile-image {
  margin-right: 30px;
}

.profile-image img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #007bff;
}

.profile-info h2 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 28px;
}

.edit-name {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.name-input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 20px;
  font-weight: bold;
}

.position {
  font-size: 20px;
  color: #007bff;
  margin: 5px 0;
}

.position-select, .department-select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 20px;
  color: #007bff;
  margin: 5px 0;
  width: 100%;
}

.department {
  font-size: 16px;
  color: #666;
  margin: 5px 0 15px 0;
}

.department-select {
  font-size: 16px;
  color: #666;
  margin: 5px 0 15px 0;
}

.contact-info p {
  margin: 5px 0;
  font-size: 16px;
}

.edit-field {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 5px 0;
}

.edit-field label {
  font-weight: bold;
  min-width: 60px;
}

.contact-input {
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.details-section {
  background-color: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  margin-bottom: 25px;
}

.details-section h3 {
  margin-top: 0;
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.detail-item {
  display: flex;
  flex-direction: column;
}

.label {
  font-weight: bold;
  color: #555;
  margin-bottom: 5px;
}

.value {
  color: #333;
  font-size: 16px;
}

.edit-input, .edit-textarea {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.edit-textarea {
  min-height: 80px;
  resize: vertical;
}

.performance-metrics {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
}

.metric {
  text-align: center;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  flex: 1;
  min-width: 150px;
}

.metric-label {
  display: block;
  font-weight: bold;
  color: #555;
  margin-bottom: 5px;
}

.metric-value {
  display: block;
  font-size: 20px;
  font-weight: bold;
  color: #007bff;
}

.document-upload {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 15px;
}

.upload-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.upload-field label {
  font-weight: bold;
  color: #333;
}

.file-preview {
  background-color: #f8f9fa;
  padding: 8px;
  border-radius: 4px;
  font-size: 14px;
}

.action-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
}

.action-button.edit, .action-button.save {
  background-color: #007bff;
  color: white;
}

.action-button.cancel {
  background-color: #6c757d;
  color: white;
}

.action-button:hover {
  opacity: 0.9;
  /* transform: translateY(-2px); */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}
</style>
