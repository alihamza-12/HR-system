<template>
  <Layout>
    <template v-slot>
      <div class="d-flex">
        <main class="flex-grow-1 p-3">
          <!-- <button @click="logout" class="btn btn-theme mb-3">Logout</button> -->
          <!-- <router-link to="/blogspage">Blogs Page</router-link><br />
          <router-link to="/userspage">Users Page</router-link> -->
        </main>
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue';

export default {
  name: 'dashBoardPage',
  components: {
    Layout
  },
  data() {
    return {
      sidebarVisible: true
    };
  },
  created() {
    const authUser = JSON.parse(localStorage.getItem('authUser'));
    //for route gard
    const emailFromUrl = this.$route.params.email || this.$route.query.email;
    if (!authUser || !authUser.email || authUser.email !== emailFromUrl) {
      this.$router.push('/login');
    }
  },
  methods: {
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },
    logout() {
      localStorage.removeItem('authUser');
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* margin-top: 60px; */
  /* height: 100vh; */
}
</style>
