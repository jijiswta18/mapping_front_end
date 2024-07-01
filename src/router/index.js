import Vue from 'vue'
import VueRouter from 'vue-router'
import store  from '../store/index.js'
// import HomeView from '../views/HomeView.vue'
// import HomeView from '../views/HomeView.vue'
// import LoginView from '../views/LoginView.vue'
// import ArPaymentTerm from '../views/ArPaymentTerm.vue'
// import ARAccountGroup from '../views/ARAccountGroup.vue'
// import TMHNActivity from '../views/TMHNActivity.vue'
// import TMArCode from '../views/TMArCode.vue'
// import CashAndGL from '../views/CashAndGL.vue'
// import EmployeeStatus from '../views/EmployeeStatus.vue'

Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes : [
  
    {
      path: '/',
      component: () => import('../layouts/MainLayout.vue'), 
      meta: { requiresAuth: true }, 
      children: [
        {
          path: 'ArPaymentTerm',
          component: () => import('../views/ArPaymentTerm.vue'), 
        },
        {
          path: 'ARAccountGroup',
          component: () => import('../views/ARAccountGroup.vue'), 
        },
        {
          path: 'StoreMedecine',
          component: () => import('../views/StoreMedecine.vue'), 
        },
        {
          path: 'TMHNActivity',
          component: () => import('../views/TMHNActivity.vue'),
        },
        {
          path: 'CashAndGL',
          component: () => import('../views/CashAndGL.vue'),
        },
        {
          path: 'EmployeeStatus',
          component: () => import('../views/EmployeeStatus.vue'),
        },
      ],
    },
    {
      path: '/login',
      component: () => import('../views/LoginView.vue'), // Login page component
     
    }
  ]
  
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth) && !store.getters.isLoggedIn) {
    
//     next('/login'); // Redirect to login page if not authenticated
//   } else {
//     // store.dispatch('startSessionTimer');
//     next(); // Proceed to the route
//   }
// });
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth) && !store.getters.isLoggedIn) {
    
//     next('/login'); // Redirect to login page if not authenticated
//   } else {
//     // store.dispatch('startSessionTimer');
//     next(); // Proceed to the route
//   }
// });


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {

    store.dispatch('checkLogin');
    
    // Check if the user is authenticated
    if (!store.getters.isLoggedIn) {
      next('/login'); // Redirect to login page if not authenticated
    } else {
      next(); // Proceed to the route
    }
  } else {
    next(); // Continue to other routes
  }
});






export default router
