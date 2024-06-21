import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArPaymentTerm from '../views/ArPaymentTerm.vue'
import ARAccountGroup from '../views/ARAccountGroup.vue'
import TMHNActivity from '../views/TMHNActivity.vue'
import TMArCode from '../views/TMArCode.vue'
import CashAndGL from '../views/CashAndGL.vue'
import EmployeeStatus from '../views/EmployeeStatus.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/ArPaymentTerm',
    name: 'ArPaymentTerm',
    component: ArPaymentTerm
  },
  {
    path: '/ARAccountGroup',
    name: 'ARAccountGroup',
    component: ARAccountGroup
  },
  {
    path: '/TMHNActivityAndGL',
    name: 'TMHNActivity',
    component: TMHNActivity
  },
  {
    path: '/TMArCode',
    name: 'TMArCode',
    component: TMArCode
  },
  {
    path: '/CashAndGL',
    name: 'CashAndGL',
    component: CashAndGL
  },
  {
    path: '/EmployeeStatus',
    name: 'EmployeeStatus',
    component: EmployeeStatus
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
