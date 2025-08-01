<template>
  <div>
    <nav
      id="sidebarMenu"
      :class="['d-md-block', 'bg-light', 'sidebar', { collapse: !visible, show: visible }]"
    >
      <div class="position-sticky pt-3">
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link class="nav-link" to="/userspage">
              Users Managment
            </router-link>
          </li>
          <hr />
          <li class="nav-item">
            <router-link class="nav-link" to="/blogspage">
              Blogs Details
            </router-link>
          </li>
          <hr />
          <li>
            <router-link class="nav-link" to="/createblog">
              Create Blog
            </router-link>
          </li>
          <hr>
          <li>
            <router-link class="nav-link" to="/employee">
              Employee
            </router-link>
          </li>
          <hr>
          <li>
            <router-link class="nav-link" to="/attendance">
              Attendance
            </router-link>
          </li>
          <hr>
          <li>
            <router-link class="nav-link" to="/payroll">
              Pay Roll
            </router-link>
          </li>
          <hr>
          <li>
            <router-link class="nav-link" to="/performance">
              Performance
            </router-link>
          </li>
          <hr>
          <li>
            <router-link class="nav-link" to="/announcement">
              Announcement
            </router-link>
          </li>
          <hr />
          <li class="nav-item">
            <button @click="logout" class="btn btn-theme mb-3">Logout</button>
          </li>
          <hr />
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'sideBar',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('authUser');
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: #f8f9fa; /* light gray background */
  border-right: 2px solid #007bff; /* blue border to distinguish */
  padding-top: 1rem;
}
.nav-link {
  color: #007bff;
  font-weight: 600;
}
.nav-link.active {
  background-color: #007bff;
  color: white !important;
}
</style>
