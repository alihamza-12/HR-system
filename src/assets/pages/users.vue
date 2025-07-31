<template>
  <div class="page-container">
    <nav-bar />
    <div class="content-wrapper">
      <side-bar />
      <div class="main-content">
        <table border="1px" style="border-collapse: collapse;">
          <tr class="headings">
            <td>ID</td>
            <td>Name</td>
            <td>Email</td>
            <td>Modification</td>
          </tr>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button v-on:click="edit(user.id)">Edit</button>
              <button v-on:click="dltUser(user.id)">Delete</button>
            </td>
          </tr>
        </table>

        <h1 v-if="show"></h1>
        <div v-else class="edit-form">
          <input v-model="inName" type="text" placeholder="Enter the name">
          <input v-model="inEmail" type="text" placeholder="Enter the email">
          <button v-on:click="modify">Save</button>
        </div>
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
      users: [],
      show: true,
      inName: "",
      inEmail: "",
      id: 0,
    }
  },
  mounted() {
    const saveUsers = localStorage.getItem("users");
    if (saveUsers) {
      this.users = JSON.parse(saveUsers);
    } else {
      this.users = [
        {id: 1, name: "saqib", email: "saqib@gmail.com"},
        {id: 2, name: "shoaib", email: "shoaib@gmail.com"},
        {id: 3, name: "jawad", email: "jawad@gmail.com"},
        {id: 4, name: "zain", email: "zain@gmail.com"},
        {id: 5, name: "muneeb", email: "muneeb@gmail.com"},
      ];
      localStorage.setItem("users", JSON.stringify(this.users));
    }
  },
  methods: {
    dltUser(userId) {
      this.users = this.users.filter(user => user.id !== userId);
      localStorage.setItem("users", JSON.stringify(this.users));
    },
    edit(id) {
      this.show = false;
      this.id = id;
      const user = this.users.find(u => u.id == this.id);
      if (user) {
        this.inName = user.name;
        this.inEmail = user.email;
      }
    },
    modify() {
      const user = this.users.find(u => u.id == this.id);
      if (user) {
        user.name = this.inName;
        user.email = this.inEmail;
        this.show = true;
        localStorage.setItem("users", JSON.stringify(this.users));
      }
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

table {
  width: 100%;
  margin-top: 20px;
}

table td {
  padding: 4px;
}

table td button {
  padding: 8px 12px;
  cursor: pointer;
  margin-left: 10px;
}

table td button:hover {
  background-color: gray;
  color: white;
}

.headings td {
  padding: 12px;
  font-size: large;
  background-color: rgb(230, 214, 214);
}

button {
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.edit-form {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  padding: 20px;
  max-width: 600px;
}

.edit-form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

.edit-form button {
  padding: 10px;
  background-color: lightgreen;
  width: 100px;
}
</style>