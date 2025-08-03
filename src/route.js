import Vue from "vue";
import VueRouter from "vue-router";
import SignupPage from "./assets/pages/signup.vue";
import LoginPage from "./assets/pages/login.vue";
import DashBoardPage from "./assets/pages/dashBoard.vue";
import BlogsPage from "./assets/pages/blogs.vue";
import UsersPage from "./assets/pages/users.vue";
import CreateBlog from "./assets/pages/createblog.vue";
import Employee from "./assets/pages/employee.vue";
import EmployeeList from "./assets/pages/employee/EmployeeList.vue";
import EmployeeForm from "./assets/pages/employee/EmployeeForm.vue";
import EmployeeProfile from "./assets/pages/employee/EmployeeProfile.vue";
import Attendance from "./assets/pages/attendendane.vue";
import Payroll from "./assets/pages/payroll.vue";
import PerformancePage from "./assets/pages/performance-page.vue";

// route.js
import AnnouncementList from './assets/pages/AnnouncementList.vue';
import CreateAnnouncement from './assets/pages/CreateAnnouncement.vue';
import Announcement from './assets/pages/Announcement.vue';



Vue.use(VueRouter);

const routes = [
    { path: '/announcements', component: AnnouncementList },
  { path: '/create-announcement', component: CreateAnnouncement },
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
    path: "/blogs",
    component: BlogsPage,
  },
  {
    path: "/users",
    component: UsersPage,
  },
  {
    path: "/createblog",
    component: CreateBlog,
  },
   {
    path: "/employee",
    component: Employee,
  },
  {
    path: "/employee/list",
    component: EmployeeList,
  },
  {
    path: "/employee/form",
    component: EmployeeForm,
  },
  {
    path: "/employee/profile",
    component: EmployeeProfile,
  },
  {
    path: "/employee/profile/:id",
    component: EmployeeProfile,
    props: true
  },
  {
    path: "/attendance",
    component: Attendance,
  },
   {
    path: "/payroll",
    component: Payroll,
  },
  {
    path: "/performance",
    component: PerformancePage,
  },
  {
    path: "/announcement",
    component: Announcement,
  },
  {
  path: '/attendance',
  component: () => import('./assets/pages/attendendane.vue')
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
