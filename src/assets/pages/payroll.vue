<template>
  <Layout>
    <template v-slot>
      <div class="payroll-management-container">
        <h1>Payroll Management</h1>
        <div class="payroll-content">
          <div class="intro-text">
            <p>Manage salaries, generate payslips, and maintain payroll records with ease.</p>
          </div>

          <div class="button-container">
            <!-- <router-link to="/payroll/form" class="nav-button">
              <div class="button-icon">📝</div>
              <div class="button-text">Add Payroll</div>
              <div class="button-description">Add new payroll entries</div>
            </router-link> -->
            <router-link to="/payroll/list" class="nav-button">
              <div class="button-icon">📋</div>
              <div class="button-text">Payroll List</div>
              <div class="button-description">View and manage payroll records</div>
            </router-link>
            <router-link to="/payroll/download" class="nav-button">
              <div class="button-icon">⬇️</div>
              <div class="button-text">Download Payslip</div>
              <div class="button-description">Generate and download payslips</div>
            </router-link>
          </div>

          <!-- Nested content area -->
          <div class="nested-view">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue';

export default {
  name: 'PayrollPage',
  components: { Layout }
}
</script>

<style scoped>
.payroll-management-container {
  width: 100%;
  padding: 20px;
}

.payroll-management-container h1 {
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

.payroll-content {
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

.nested-view {
  margin-top: 40px;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
