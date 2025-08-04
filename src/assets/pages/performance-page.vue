<template>
  <Layout>
    <template v-slot>
      <div class="performance-management-container">
        <h1>Performance Management</h1>
        <div class="performance-content">
          <div class="intro-text">
            <p>Track employee reviews, manage evaluations, and monitor performance effectively.</p>
          </div>

          <div class="button-container">
            <router-link to="/performance/summary" class="nav-button">
              <div class="button-icon">📊</div>
              <div class="button-text">Review Summary</div>
              <div class="button-description">View overall performance reviews</div>
            </router-link>
            <router-link to="/performance/form" class="nav-button">
              <div class="button-icon">📝</div>
              <div class="button-text">Add Review</div>
              <div class="button-description">Add a new performance review</div>
            </router-link>
            <router-link to="/performance/evaluation" class="nav-button">
              <div class="button-icon">✅</div>
              <div class="button-text">Task Evaluation</div>
              <div class="button-description">Evaluate employee tasks & progress</div>
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
  name: 'PerformancePage',
  components: { Layout }
}
</script>

<style scoped>
.performance-management-container {
  width: 100%;
  padding: 20px;
}

.performance-management-container h1 {
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

.performance-content {
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
  background-color: #28a745;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  border: 1px solid #1e7e34;
  min-width: 250px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav-button:hover {
  background-color: #1e7e34;
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
