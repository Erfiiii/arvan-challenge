import Vue from "vue";
import VueRouter from "vue-router";

import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/', 
    redirect: {
      name: 'ROUTE_HOME'
    } 
  },
  {
    name: "ROUTE_LOGIN",
    path: "/login",
    component: () => import("../views/Auth/Login.vue"),
    meta: {
      redirectToHome: true
    }
  },
  {
    name: "ROUTE_REGISTER",
    path: "/register",
    component: () => import("../views/Auth/Register.vue"),
    meta: {
      redirectToHome: true
    }
  },
  {
    name: "ROUTE_HOME",
    path: "/articles",
    component: () => import("../views/Home.vue"),
    meta: {
      requiresAuth: true 
    }
  },
  {
    name: "ROUTE_ARTICLES",
    path: "/articles/page/:page",
    component: () => import("../views/Home.vue"),
    meta: {
      requiresAuth: true 
    }
  },
  {
    name: "ROUTE_ADD_ARTICLE",
    path: "/articles/create",
    component: () => import("../views/Articles/AddArticle.vue"),
    meta: {
      requiresAuth: true 
    }
  },
  {
    name: "ROUTE_EDIT_ARTICLE",
    path: "/articles/edit/:slug",
    component: () => import("../views/Articles/EditArticle.vue"),
    meta: {
      requiresAuth: true 
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to,from,next)=> {
  if(!store.state.user.id && (to.name != 'ROUTE_LOGIN' && to.name != 'ROUTE_REGISTER')) {
    try {
      await store.dispatch("getUser")
    } catch (error) {
      // 
    }
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (!store.getters.isAuthenticated) {
      next({
        name: 'ROUTE_LOGIN',
      })
    } else {
      next();
    }
  } else if(to.matched.some(record => record.meta.redirectToHome)) {
    if (store.getters.isAuthenticated) {
      next({
        name: 'ROUTE_HOME',
      })
    } else {
      next()
    }
  }else {
    next() // make sure to always call next()!
  }
})

export default router;
