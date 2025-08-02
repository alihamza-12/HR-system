<template>
  <Layout>
    <template v-slot>
      <h1>Employee Management</h1>
      <div class="employee-content">
        <!-- Content will be added here -->
        <!-- <p>Employee management features coming soon</p> -->
         <p>that ali part of page</p>
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
.employee-page {
  padding: 20px;
}
.employee-content {
  margin-top: 20px;
}
</style>
