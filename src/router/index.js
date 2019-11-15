import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    name: "ROUTE_LOGIN",
    path: "/login",
    component: () => import("../views/Auth/Login.vue")
  },
  {
    name: "ROUTE_REGISTER",
    path: "/register",
    component: () => import("../views/Auth/Register.vue")
  },
  {
    name: "ROUTE_HOME",
    path: "/articles",
    component: () => import("../views/Home.vue")
  },
  {
    name: "ROUTE_ADD_ARTICLE",
    path: "/articles/create",
    component: () => import("../views/Articles/AddArticle.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
