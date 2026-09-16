import { createRouter, createWebHistory } from 'vue-router';

import Login from './pages/Login.vue';
import Signup from './pages/Signup.vue';
import Newsletter from './pages/Newsletter.vue';
import Home from './pages/Home.vue';
import Cart from './pages/Cart.vue';
import Shop from './pages/Shop.vue';

const routes = [
  {
    path: '/',
    redirect: '/Home'
  },

  {
    path: '/login',
    component: Login
  },

  {
    path: '/signup',
    component: Signup
  },

  {
    path: '/Home',
    name: 'home',
    component: Home
  },

  {
    path: '/shop/:category',
    name: 'Shop',
    component: Shop,
    props: true
  },

  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },

  {
    path: '/Newsletter',
    name: 'Newsletter',
    component: Newsletter
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
