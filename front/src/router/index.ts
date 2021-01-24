import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Auth from '../views/auth/AuthContainer.vue'
import Main from '../views/main/MainContainer.vue'
import Wallets from '../views/main/Wallets.vue'
import Converting from '../views/main/Converting.vue'


import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import store from '../store/index'


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { path: "*", redirect: '/' },

  {
    path: '/',
    redirect: '/main/wallets'
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    children: [
      {
        path: 'login',
        component: Login,

      },
      {
        path: 'register',
        component: Register,

      }
    ]
  },

  {
    path: '/main',
    redirect: '/main/wallets',
    name: 'Main',
    component: Main,
    children: [
      {
        path: "wallets",
        component: Wallets,
        meta: {
          requiresAuth: true,
        }
      },
      {
        path: "converting",
        component: Converting,
        meta: {
          requiresAuth: true,
        }
      }
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const isAuthenticated = store.getters['auth/isAuthenticated']

    if (isAuthenticated) {
      next()
      return
    }
    next('/auth/login')
  }
  next()
})

export default router
