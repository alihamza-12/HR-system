<template>
  <nav class="navbar navbar-expand-lg navbar-light custom-navbar">
    <div class="container-fluid">
      <button class="navbar-toggler d-lg-none" type="button" aria-label="Toggle sidebar" @click="$emit('toggle-sidebar')">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- <router-link class="navbar-brand" to="/dashboard">Back to Dashboard</router-link> -->
      <!-- <router-link class="navbar-brand" :to="{ path: '/dashboard', params: { email: authUser.email } }">Back to Dashboard</router-link> -->
      <router-link class="navbar-brand" :to="{ path: '/dashboard', query: { email: authUser.email } }">Back to Dashboard</router-link>

      <span v-if="authUser" class="navbar-text user-name-display">
        {{ authUser.name || authUser.email }}
      </span>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navBar',
  data() {
    return {
      authUser: null
    };
  },
  created() {
    const user = localStorage.getItem('authUser');
    if (user) {
      this.authUser = JSON.parse(user);
    }
  }
}
</script>

<style scoped>

.custom-navbar {
  background-color: #007bff !important; /* Bootstrap primary blue */
  color: white;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  margin-top: 0 !important;
  padding-top: 0 !important;
}

.custom-navbar .navbar-brand,
.custom-navbar .nav-link,
.custom-navbar .dropdown-menu a {
  color: white !important;
  font-weight: 600;
}

.custom-navbar .nav-link.active {
  background-color: #0056b3 !important; /* darker blue */
  border-radius: 0.25rem;
}
.user-name-display {
  margin-left: 15px;
  font-weight: 600;
  color: white;
  font-size: 1rem;
}
</style>

