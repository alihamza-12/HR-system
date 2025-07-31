<template>
  <div id="app">
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

                                <form @submit.prevent="onSubmit">
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

            <p class="text-muted text-center mt-5 mb-5">Do not have an account?     <router-link to="/signup">Sign Up</router-link></p>


        </div>
    </div>
</div>

  </div>
</div>
<!-- login page here
<br>
<router-link to="/dashboard">Dashboard</router-link> -->
</template>

<script>
export default {
  name: 'loginPage',
  data() {
    return {
      inEmail: "",
      inPassword: ""
    };
  },
  methods: {
    onSubmit() {
      if (!this.inEmail || !this.inPassword) {
        alert('Please fill in all fields.');
        return;
      }
      let users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(user => user.email === this.inEmail && user.password === this.inPassword);
      if (user) {
        localStorage.setItem('authUser', JSON.stringify(user));
        //for route gard
        this.$router.push({ path: '/dashBoard', query: { email: this.inEmail } });
      } else {
        alert('Invalid email or password.');
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
