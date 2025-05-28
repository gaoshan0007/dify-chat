import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
// import HomeView from '../views/HomeView.vue'; // Example, create if needed or remove

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView, // Example
  // },
  // Add more routes here later
];

const router = new VueRouter({
  mode: 'history', // Or 'hash'
  base: process.env.BASE_URL || '/', // Adjust if needed
  routes,
});

export default router;
