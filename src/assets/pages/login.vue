<template>
  <div id="app">
    <div id="main-wrapper" class="container">
      <div class="row justify-content-center">
        <div class="col-xl-10">
          <div class="card border-0">
            <div class="card-body p-0">
              <div class="row no-gutters">
                <div class="col-lg-6">
                  <div class="p-5 outer-div">
                    <div class="mb-5">
                      <h3 class="h4 font-weight-bold text-theme">Login</h3>
                    </div>
                    <h6 class="h5 mb-0">Welcome To our Web Site</h6>
                    <p class="text-muted mt-2 mb-5">Enter your ceridentials For sign up.</p>

                    <form @submit.prevent="handleLogin">
                      <div class="form-group mb-4">
                        <label for="email">Email address</label>
                        <input v-model="inEmail" type="email" class="form-control" id="email" placeholder="Enter you Email">
                      </div>
                      <div class="form-group mb-4">
                        <label for="password">Password</label>
                        <input v-model="inPassword" type="password" class="form-control" id="password" placeholder="Enter you Password">
                      </div>
                      <button type="submit" class="btn btn-theme">Login</button>
                    </form>
                  </div>
                </div>

                <div class="col-lg-6 d-none d-lg-inline-block">
                  <div class="account-block rounded-right">
                    <div class="overlay rounded-right theme-side"></div>
                    <div class="account-testimonial">
                      <h4 class="text-white mb-4">This webSite is famous for Managing Users and the Blogs</h4>
                      <p class="lead text-white">"Here you can View Products.."</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <p class="text-muted text-center mt-5 mb-5">
            Do not have an account?
            <router-link to="/signup">Sign Up</router-link>
          </p>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'loginPage',
  data() {
    return {
      inEmail: '',
      inPassword: ''
    };
  },
  computed: {
    ...mapGetters('auth', ['loading', 'error', 'user'])
  },
  methods: {
    ...mapActions('auth', ['login']),
    async handleLogin() {
  if (!this.inEmail || !this.inPassword) {
    alert('Please fill in all fields.');
    return;
  }

  const result = await this.login({
    email: this.inEmail,
    password: this.inPassword
  });

  if (result.success) {
    alert("Login succeeded");
    this.$router.push('/dashboard');
  } else {
    alert(result.message || 'Invalid credentials');
  }
}

  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
