<template>
  <Layout>
    <template v-slot>
      <div class="employee-profile-container">
        <div class="header-section">
          <h1>Employee Profile</h1>
          <div class="profile-actions">
            <button v-if="!isEditing" class="action-button edit" @click="startEditing">Edit Profile</button>
            <button v-else class="action-button cancel" @click="cancelEditing">Cancel</button>
            <button class="action-button save" v-if="isEditing" @click="saveProfile">Save Changes</button>
            <button class="action-button download">Download Profile</button>
          </div>
        </div>
        <div class="employee-profile-content">
          <div class="profile-header">
            <div class="profile-image">
              <img src="@/assets/logo.png" alt="Employee Photo">
            </div>
            <div class="profile-info">
              <h2 v-if="!isEditing">{{ employeeData.firstName }} {{ employeeData.lastName }}</h2>
              <div v-else class="edit-name">
                <input v-model="employeeData.firstName" placeholder="First Name" class="name-input">
                <input v-model="employeeData.lastName" placeholder="Last Name" class="name-input">
              </div>
              <p v-if="!isEditing" class="position">{{ employeeData.position }}</p>
              <select v-else v-model="employeeData.position" class="position-select">
                <option value="Software Engineer">Software Engineer</option>
                <option value="HR Manager">HR Manager</option>
                <option value="Designer">Designer</option>
                <option value="Manager">Manager</option>
              </select>
              <p v-if="!isEditing" class="department">{{ employeeData.department }}</p>
              <select v-else v-model="employeeData.department" class="department-select">
                <option value="IT">IT</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
              </select>
              <div class="contact-info">
                <p v-if="!isEditing"><strong>Email:</strong> {{ employeeData.email }}</p>
                <div v-else class="edit-field">
                  <label>Email:</label>
                  <input v-model="employeeData.email" type="email" class="contact-input">
                </div>
                <p v-if="!isEditing"><strong>Phone:</strong> {{ employeeData.phone }}</p>
                <div v-else class="edit-field">
                  <label>Phone:</label>
                  <input v-model="employeeData.phone" type="tel" class="contact-input">
                </div>
              </div>
            </div>
          </div>
          
          <div class="profile-details">
            <div class="details-section">
              <h3>Personal Information</h3>
              <div class="details-grid">
                <div class="detail-item">
                  <span class="label">Date of Birth:</span>
                  <span v-if="!isEditing" class="value">{{ employeeData.dob }}</span>
                  <input v-else v-model="employeeData.dob" type="date" class="edit-input">
                </div>
                <div class="detail-item">
                  <span class="label">Address:</span>
                  <span v-if="!isEditing" class="value">{{ employeeData.address }}</span>
                  <textarea v-else v-model="employeeData.address" class="edit-textarea"></textarea>
                </div>
                <div class="detail-item">
                  <span class="label">Emergency Contact:</span>
                  <span v-if="!isEditing" class="value">{{ employeeData.emergencyContact }}</span>
                  <input v-else v-model="employeeData.emergencyContact" class="edit-input">
                </div>
              </div>
            </div>
            
            <div class="details-section">
              <h3>Employment Information</h3>
              <div class="details-grid">
                <div class="detail-item">
                  <span class="label">Employee ID:</span>
                  <span class="value">{{ employeeData.id }}</span>
                </div>
                <div class="detail-item">
                  <span class="label">Start Date:</span>
                  <span v-if="!isEditing" class="value">{{ employeeData.startDate }}</span>
                  <input v-else v-model="employeeData.startDate" type="date" class="edit-input">
                </div>
                <div class="detail-item">
                  <span class="label">Salary:</span>
                  <span v-if="!isEditing" class="value">${{ employeeData.salary }}</span>
                  <input v-else v-model="employeeData.salary" type="number" class="edit-input">
                </div>
                <div class="detail-item">
                  <span class="label">Manager:</span>
                  <span v-if="!isEditing" class="value">{{ employeeData.manager }}</span>
                  <input v-else v-model="employeeData.manager" class="edit-input">
                </div>
              </div>
            </div>
            
            <div class="details-section">
              <h3>Performance</h3>
              <div class="performance-metrics">
                <div class="metric">
                  <span class="metric-label">Overall Rating:</span>
                  <span class="metric-value">{{ employeeData.performance.rating }}/5</span>
                </div>
                <div class="metric">
                  <span class="metric-label">Projects Completed:</span>
                  <span class="metric-value">{{ employeeData.performance.projects }}</span>
                </div>
                <div class="metric">
                  <span class="metric-label">Attendance:</span>
                  <span class="metric-value">{{ employeeData.performance.attendance }}%</span>
                </div>
              </div>
            </div>
            
            <div class="details-section" v-if="isEditing">
              <h3>Documents</h3>
              <div class="document-upload">
                <div class="upload-field">
                  <label for="resume">Resume:</label>
                  <input type="file" id="resume" @change="handleFileUpload($event, 'resume')">
                  <div v-if="employeeData.resumePreview" class="file-preview">
                    <p>Current: {{ employeeData.resumePreview }}</p>
                  </div>
                </div>
                <div class="upload-field">
                  <label for="contract">Contract:</label>
                  <input type="file" id="contract" @change="handleFileUpload($event, 'contract')">
                  <div v-if="employeeData.contractPreview" class="file-preview">
                    <p>Current: {{ employeeData.contractPreview }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue';

export default {
  name: 'EmployeeProfile',
  components: {
    Layout
  },
  data() {
    return {
      isEditing: false,
      originalData: {},
      employeeData: {
        id: 'EMP001',
        firstName: 'John',
        lastName: 'Doe',
        position: 'Senior Software Engineer',
        department: 'IT Department',
        email: 'john.doe@example.com',
        phone: '(123) 456-7890',
        dob: '1990-01-01',
        address: '123 Main Street, City, State 12345',
        emergencyContact: 'Jane Doe - (987) 654-3210',
        startDate: '2020-03-15',
        salary: 85000,
        manager: 'Robert Johnson',
        performance: {
          rating: 4.5,
          projects: 24,
          attendance: 98
        },
        resumePreview: 'john_doe_resume.pdf',
        contractPreview: 'john_doe_contract.pdf'
      }
    }
  },
  methods: {
    startEditing() {
      this.originalData = JSON.parse(JSON.stringify(this.employeeData));
      this.isEditing = true;
    },
    cancelEditing() {
      this.employeeData = JSON.parse(JSON.stringify(this.originalData));
      this.isEditing = false;
    },
    saveProfile() {
      // In a real app, you would send the updated data to your API
      console.log('Saving employee data:', this.employeeData);
      this.isEditing = false;
      // Show success message
      alert('Profile updated successfully!');
    },
    handleFileUpload(event, fileType) {
      const file = event.target.files[0];
      if (file) {
        // In a real app, you would upload the file to your server
        // For now, we'll just update the preview
        this.employeeData[`${fileType}Preview`] = file.name;
        console.log(`File selected for ${fileType}:`, file.name);
      }
    }
  }
}
</script>

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

.action-button.download {
  background-color: #28a745;
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
