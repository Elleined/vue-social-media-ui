import {createRouter, createWebHistory} from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";
import {routeGuard} from "@/utils/routeGuard.ts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: "/:catchAll(.*)",
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      beforeEnter: routeGuard,
    },
  ],
})

export default router
