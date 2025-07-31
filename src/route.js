import Vue from "vue";
import VueRouter from "vue-router";
import SignupPage from "./assets/pages/signup.vue";
import LoginPage from "./assets/pages/login.vue";
import DashBoardPage from "./assets/pages/dashBoard.vue";
import BlogsPage from "./assets/pages/blogs.vue";
import UsersPage from "./assets/pages/users.vue";
import createBlog from "./assets/pages/createblog.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/signup",
  },
  {
    path: "/signup",
    component: SignupPage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/dashboard",
    component: DashBoardPage,
  },
  {
    path: "/blogspage",
    component: BlogsPage,
  },
  {
    path: "/userspage",
    component: UsersPage,
  },
  {
    path: "/createblog",
    component: createBlog,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

// Global route guard
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/signup'];
  const authRequired = !publicPages.includes(to.path);
  const authUser = JSON.parse(localStorage.getItem('authUser'));

  if (authRequired && !authUser) {
    return next('/login');
  }
  next();
});

export default router;
