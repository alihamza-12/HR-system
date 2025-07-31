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
export default {
  name: 'signUpPage',
  components: {},
  data() {
    return {
      inName: "",
      inPhone: "",
      inEmail: "",
      inPassword: ""
    };
  },
  methods: {
    onSubmit() {
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
        password: this.inPassword
      };

      let users = JSON.parse(localStorage.getItem('users')) || [];

      const userExists = users.some(user => user.email === userData.email);

      if (!userExists) {
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
        alert('User data saved successfully!');
        this.$router.push('/login')
      } else {
        alert('User with this email already exists!');
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
