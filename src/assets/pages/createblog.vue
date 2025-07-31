<template>
  <div class="page-container">
    <nav-bar />
    <div class="content-wrapper">
      <side-bar />
      <div class="main-content">
        
         <h1>Add New Product</h1>
    <form>
      <label>
        <span>ID</span>
        <!-- <span>{{ inputTitle }}</span> -->
        <input v-model="inputId" type="number" placeholder="Enter The ID" />
      </label>
      <label>
        <span>Title</span>
        <input v-model="inputTitle" type="text" placeholder="Enter The Title" />
      </label>
      <label>
        <span>Preview Text</span>
        <input v-model="inputPre" type="text" placeholder="Enter The Preview Text" />
      </label>
      <button v-on:click.prevent="savePro">Submit</button>
      <!-- <router-link class="btn-home" :to="`/createblog`">Home Page</router-link> -->
    </form>
    
    

      </div>
    </div>
  </div>
</template>

<script>
import navBar from '@/components/navbar.vue';
import sideBar from '@/components/sideBar.vue';

export default {
  name: "UsersPage",
  components: {
    navBar,
    sideBar
  },
  data() {
    return {
        inputId:null,
      inputTitle:"",
      inputPre:"",
      products:[],
    }
  },
  methods:{
    savePro(){
      // console.log(this.inputId);
      const products=localStorage.getItem("blogs");
      const existedPro=products ? JSON.parse(products) : [];
      console.log(existedPro);
     const newProduct={
       id:this.inputId,
      title:this.inputTitle,
      previewText:this.inputPre
     }
    //  console.log(newProduct)
     existedPro.push(newProduct);
     localStorage.setItem("blogs",JSON.stringify(existedPro));
    //  this.$router.push('/');
    }
  }
 
 
}
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-wrapper {
  display: flex;
  flex: 1;
}

.main-content {
  flex: 1;
  padding: 20px;
  /* margin-left: 250px; */
}
.blog-form-container {
  max-width: 500px;
  margin: 40px auto;
  padding: 30px;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.5);
  font-family: 'Segoe UI', sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 24px;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
}
form span{
  text-align: start;
  margin-left: 10px;
  font-size: 20px;
  font-weight: 500;
}

label {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  font-size: 14px;
  color: #555;
}

input {
  padding: 10px 12px;
  margin-top: 6px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
}
button {
  padding: 12px;
  background-color: #4a90e2;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

button:hover {
  background-color: #357ab8;
}
.btn-home{
  text-align: right;
  margin-top: 20px;
}



</style>