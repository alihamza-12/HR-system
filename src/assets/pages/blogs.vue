<template>
  <div class="page-container">
    <nav-bar />
    <div class="content-wrapper">
      <side-bar />
      <div class="main-content">
        
         <h1>Electronics Store</h1>
    <div class="blogs-cards">
      <div v-for="blog in blogs" :key="blog.id" class="blog-card">
        <h2>{{blog.title}}</h2>
        <p>{{ blog.previewText }} </p>
        <div class="btns">
          
          <button v-on:click="dltblog(blog.id)" class="btn btn-dlt">Delecte Blog</button>
        </div>
      </div>
    </div>
    
    
    <router-link class="btn btn-view btn-add" :to="`/createblog`">Add New Product</router-link>

      </div>
    </div>
  </div>
</template>

<script>
import navBar from '@/components/navbar.vue';
import sideBar from '@/components/sideBar.vue';

export default {
  name: "BlogsPage",
  components: {
    navBar,
    sideBar
  },
  data() {
    return {
         blogs:[],
     
    }
  },
   mounted(){
    const saveblogs=localStorage.getItem("blogs");
    if(saveblogs){
      // console.log("blogs found");
      this.blogs=JSON.parse(saveblogs);
    }else{
      // console.log("blogs not found");
      this.blogs=[
         {id:1,title:"Ovan",previewText:"Ovan is Avaliable in our store.Here are some catchy electronics shop slogans to inspire your creative circuitry: Unleash the Technophile Within You! Bringing the Latest Gadgets to Your Doorstep. Get Wired to the Future With Our Cutting-Edge Electronics! Discover a New Dimension of Electronics at Our Shop.Your electronics slogan or tagline is important because it is one of the first things that people will see or hear when they are introduced to your brand. It is a chance to make a strong first impression and to create an emotional connection with your consumers. You may also read: Tagline, Slogan or Claim"},
         {id:2,title:"Cooker",previewText:"Cooker is Avaliable in our store.Here are some catchy electronics shop slogans to inspire your creative circuitry: Unleash the Technophile Within You! Bringing the Latest Gadgets to Your Doorstep. Get Wired to the Future With Our Cutting-Edge Electronics! Discover a New Dimension of Electronics at Our Shop.Your electronics slogan or tagline is important because it is one of the first things that people will see or hear when they are introduced to your brand. It is a chance to make a strong first impression and to create an emotional connection with your consumers. You may also read: Tagline, Slogan or Claim"},
         {id:3,title:"TV",previewText:"TV is Avaliable in our store.Here are some catchy electronics shop slogans to inspire your creative circuitry: Unleash the Technophile Within You! Bringing the Latest Gadgets to Your Doorstep. Get Wired to the Future With Our Cutting-Edge Electronics! Discover a New Dimension of Electronics at Our Shop.Your electronics slogan or tagline is important because it is one of the first things that people will see or hear when they are introduced to your brand. It is a chance to make a strong first impression and to create an emotional connection with your consumers. You may also read: Tagline, Slogan or Claim"},
         {id:4,title:"Faridge",previewText:"Faridge is Avaliable in our store.Here are some catchy electronics shop slogans to inspire your creative circuitry: Unleash the Technophile Within You! Bringing the Latest Gadgets to Your Doorstep. Get Wired to the Future With Our Cutting-Edge Electronics! Discover a New Dimension of Electronics at Our Shop.Your electronics slogan or tagline is important because it is one of the first things that people will see or hear when they are introduced to your brand. It is a chance to make a strong first impression and to create an emotional connection with your consumers. You may also read: Tagline, Slogan or Claim"},
         {id:5,title:"Machine",previewText:"Machine is Avaliable in our store.Here are some catchy electronics shop slogans to inspire your creative circuitry: Unleash the Technophile Within You! Bringing the Latest Gadgets to Your Doorstep. Get Wired to the Future With Our Cutting-Edge Electronics! Discover a New Dimension of Electronics at Our Shop.Your electronics slogan or tagline is important because it is one of the first things that people will see or hear when they are introduced to your brand. It is a chance to make a strong first impression and to create an emotional connection with your consumers. You may also read: Tagline, Slogan or Claim"},
         {id:6,title:"Frezeer",previewText:"Frezeer is Avaliable in our store.Here are some catchy electronics shop slogans to inspire your creative circuitry: Unleash the Technophile Within You! Bringing the Latest Gadgets to Your Doorstep. Get Wired to the Future With Our Cutting-Edge Electronics! Discover a New Dimension of Electronics at Our Shop.Your electronics slogan or tagline is important because it is one of the first things that people will see or hear when they are introduced to your brand. It is a chance to make a strong first impression and to create an emotional connection with your consumers. You may also read: Tagline, Slogan or Claim"},
      ];
      localStorage.setItem("blogs",JSON.stringify(this.blogs));
    }
  },
  methods:{
    dltblog(blogId){
      this.blogs = this.blogs.filter(blog => blog.id !== blogId);
      // console.log(blogId);
      localStorage.setItem("blogs",JSON.stringify(this.blogs));
    },
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
.blogs-cards{
  display: grid; 
  grid-template-columns: repeat(2,1fr);
  gap: 5%;
  margin-bottom: 10%;
  }
  .blog-card {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 10px;
  text-align: start;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .blog-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
  .blog-card p {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  }
  .btns{
    display: flex;
    justify-content: space-between;
    /* border: 1px solid black; */
  }
  .btn{
    all: unset;
    padding: 12px;
    border: none;
    outline: none;
    color: white;
    border-radius: 5px;
    margin-top: 13px;
    cursor: pointer;
  }
  .btn-view{
    background-color: rgb(111, 111, 247);
  }
  .btn-dlt{
    background-color: rgb(248, 93, 93);
  }
  .btn-add{
    margin-top: 0px;
    margin-bottom: 5%;
    padding: 25px;
    width:136px;
    background-color: rgb(34, 238, 34);
    border: 1px solid gray;
    display: inline-block;
  }
  .btn-add:hover{
    color: black;
  }


</style>