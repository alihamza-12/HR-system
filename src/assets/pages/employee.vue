<template>
  <Layout>
    <template v-slot>
      <div class="employee-management-container">
        <h1>Employee Management</h1>
        <div class="employee-content">
          <div class="intro-text">
            <p>Manage your organization's employees efficiently with our comprehensive employee management system.</p>
          </div>
          
          <!-- <div class="features-section">
            <h2>Key Features</h2>
            <ul class="features-list">
              <li>View and manage employee profiles</li>
              <li>Add new employees with detailed information</li>
              <li>Upload and manage employee documents</li>
              <li>Soft delete functionality to maintain records</li>
              <li>Performance tracking and metrics</li>
            </ul>
          </div> -->
          
          <div class="button-container">
            <router-link to="/employee/list" class="nav-button">
              <div class="button-icon">📋</div>
              <div class="button-text">Employee List</div>
              <div class="button-description">View all employees and manage their information</div>
            </router-link>
            <router-link to="/employee/form" class="nav-button">
              <div class="button-icon">📝</div>
              <div class="button-text">Add Employee</div>
              <div class="button-description">Create new employee profiles</div>
            </router-link>
            <router-link to="/employee/profile" class="nav-button">
              <div class="button-icon">👤</div>
              <div class="button-text">Employee Profile</div>
              <div class="button-description">View and edit employee details</div>
            </router-link>
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue';

export default {
  name: 'EmployeePage',
  components: {
    Layout
  },
  data() {
    return {
      // Data properties will be added here
    }
  },
  methods: {
    // Methods will be added here
  }
}
</script>

<style scoped>
.employee-management-container {
  width: 100%;
  padding: 20px;
}

.employee-management-container h1 {
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

.employee-content {
  margin-top: 20px;
}

.intro-text {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.intro-text p {
  font-size: 18px;
  color: #555;
  margin: 0;
}

.features-section {
  background-color: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  margin-bottom: 30px;
}

.features-section h2 {
  color: #333;
  margin-top: 0;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
}

.features-list {
  list-style-type: none;
  padding: 0;
}

.features-list li {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  font-size: 16px;
  color: #555;
}

.features-list li:before {
  content: "✓";
  color: #28a745;
  font-weight: bold;
  display: inline-block;
  width: 20px;
}

.button-container {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
  flex-wrap: wrap;
  gap: 20px;
}

.nav-button {
  padding: 25px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  border: 1px solid #0056b3;
  min-width: 250px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav-button:hover {
  background-color: #0056b3;
  /* transform: translateY(-5px); */
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}



.button-icon {
  font-size: 40px;
  margin-bottom: 15px;
}

.button-text {
  font-size: 20px;
  margin-bottom: 10px;
}

.button-description {
  font-size: 14px;
  font-weight: normal;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .button-container {
    flex-direction: column;
    align-items: center;
  }
  
  .nav-button {
    width: 100%;
    max-width: 300px;
  }
}
</style>
