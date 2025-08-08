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
import Payroll from "./assets/pages/payroll.vue";
import AppPayrollForm from "./assets/pages/payroll/AppPayrollForm.vue";
import AppPayrollList from "./assets/pages/payroll/AppPayrollList.vue";
import PerformancePage from "./assets/pages/performance-page.vue";
import AppReviewSummary from "./assets/pages/performance/AppReviewSummary.vue";
import AppReviewForm from "./assets/pages/performance/AppReviewForm.vue";
import AppTaskEvaluation from "./assets/pages/performance/AppTaskEvaluation.vue";

// route.js
import AnnouncementList from './assets/pages/AnnouncementList.vue';
import CreateAnnouncement from './assets/pages/CreateAnnouncement.vue';
import Announcement from './assets/pages/announcement.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/announcements', component: AnnouncementList },
  { path: '/create-announcement', component: CreateAnnouncement },
  // Payroll routes
  { path: "/payroll", component: Payroll },
  { path: "/payroll/form", component: AppPayrollForm },
  { path: "/payroll/list", component: AppPayrollList },

  // Performance routes
  { path: "/performance", component: PerformancePage },
  { path: "/performance/summary", component: AppReviewSummary },
  { path: "/performance/form", component: AppReviewForm },
  { path: "/performance/evaluation", component: AppTaskEvaluation },

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
    component: () => import('./assets/pages/Attendance.vue')
  },
  {
    path: "/attendance-list",
    component: () => import('./assets/pages/AttendanceList.vue')
  },
  {
    path: "/attendance-check-in",
    component: () => import('./assets/pages/AttendanceCheckIn.vue')
  },
  {
    path: "/attendance-check-out",
    component: () => import('./assets/pages/AttendanceCheckOut.vue')
  },
  {
    path: "/attendance-report",
    component: () => import('./assets/pages/AttendanceReport.vue')
  },
  {
    path: "/announcement",
    component: Announcement,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

// Global route guard
// router.beforeEach((to, from, next) => {
//   // const publicPages = ['/login', '/signup'];
//   // const authRequired = !publicPages.includes(to.path);
//   // const authUser = JSON.parse(localStorage.getItem('authUser'));

//   // if (authRequired && !authUser) {
//   //   return next('/login');
//   // }
//   next();
// });

export default router;
