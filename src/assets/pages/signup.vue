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
                                    <h3 class="h4 font-weight-bold text-theme">Sign Up</h3>
                                </div>

                                <h6 class="h5 mb-0">Welcome To our Web Site</h6>
                                <p class="text-muted mt-2 mb-5">Enter your ceridentials For sign up.</p>

                                <form @submit.prevent="onSubmit">
                                    <div class="form-group mb-4">
                                        <label for="name">Name</label>
                                        <input v-model="inName" type="text" class="form-control" id="name" placeholder="Enter you Name">
                                    </div>
                                    <div class="form-group mb-4">
                                        <label for="phone">Phone no</label>
                                        <input v-model="inPhone" type="number" class="form-control" id="phone" placeholder="Enter you Phone no.">
                                    </div>
                                    <div class="form-group mb-4">
                                        <label for="email">Email address</label>
                                        <input v-model="inEmail" type="email" class="form-control" id="email" placeholder="Enter you Email">
                                    </div>
                                    <div class="form-group mb-4">
                                        <label for="password">Password</label>
                                        <input v-model="inPassword" type="password" class="form-control" id="password" placeholder="Enter you Password">
                                    </div>
                                    <!-- <div class="form-group mb-4">
                                        <label for="con-pass">Confirm Password</label>
                                        <input v-model="conPass" type="password" class="form-control" id="con-pass" placeholder="Enter you Confirm Password">
                                    </div> -->
                                    <div class="form-group mb-4">
                                      <label for="role">Role</label>
                                      <select v-model="inRole" class="form-control" id="role">
                                        <option value="employee">Employee</option>
                                        <option value="manager">Manager</option>
                                        <option value="admin">Admin</option>
                                      </select>
                                    </div>
                                    <button type="submit" class="btn btn-theme">Sign Up</button>
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

            <p class="text-muted text-center mt-5 mb-5">Alreaady have an account?     <router-link to="/login">Login page</router-link></p>


        </div>
    </div>
</div>

  </div>
</template>

<script>
import API from "@/services/api";

export default {
  name: 'signUpPage',
  data() {
    return {
      inName: "",
      inPhone: "",
      inEmail: "",
      inPassword: "",
      inRole: "admin"
    };
  },
  methods: {
    async onSubmit() {
      if (!this.inName || !this.inPhone || !this.inEmail || !this.inPassword) {
        alert('Please fill in all fields.');
        return;
      }
      if (!this.inEmail.endsWith('@gmail.com')) {
        alert('Only Gmail addresses are allowed.');
        return;
      }
      if (this.inPassword.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
      }

      const userData = {
        name: this.inName,
        phone: this.inPhone,
        email: this.inEmail,
        password: this.inPassword,
        role: this.inRole
      };

      try {
        const response = await API.post('/register', userData);

        if (response.status === 201 || response.status === 200) {
          alert("Registration successful!");
          this.$router.push("/login");
        }
      } catch (error) {
        console.error("Signup Error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        console.error("Error details:", error.response?.data?.errors || error.response?.data?.message);
        
        // Show detailed error messages
        const errorMessage = error.response?.data?.message || "Registration failed.";
        const errors = error.response?.data?.errors;
        
        if (errors) {
          const errorDetails = Object.values(errors).flat().join('\n');
          alert(`${errorMessage}\n\nDetails:\n${errorDetails}`);
        } else {
          alert(errorMessage);
        }
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
#app{
    /* margin-top:20px; */
    background: #f6f9fc;
}
#main-wrapper{
  margin-top: 60px;
}
.account-block {
    padding: 0;
    background-image: url(https://bootdey.com/img/Content/bg1.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    position: relative;
}
.account-block .overlay {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
}
.account-block .account-testimonial {
    text-align: center;
    color: #fff;
    position: absolute;
    margin: 0 auto;
    padding: 0 1.75rem;
    bottom: 3rem;
    left: 0;
    right: 0;
}

.text-theme {
    color: #5369f8 !important;
}

.btn-theme {
    background-color: #5369f8;
    border-color: #5369f8;
    color: #fff;
}
.outer-div{
    /* border: 1px solid black; */
     box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.5);
}
.theme-side{
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 1);
    /* margin-left: 10%; */
}
</style>
