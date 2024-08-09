import Vue from 'vue'
import VueRouter from 'vue-router'
import store  from '../store/index.js'

// import MainLayout from '../layouts/MainLayout.vue'
// import LoginView from '../views/LoginView.vue'
// import ArPaymentTerm from '../views/ArPaymentTerm.vue'
// import ARAccountGroup from '../views/ARAccountGroup.vue'
// import TMHNActivity from '../views/TMHNActivity.vue'
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
      // component: MainLayout, 
      meta: { requiresAuth: true }, 
      children: [
        {
          path: '',
          // component: ArPaymentTerm, 
          component: () => import('../views/ArPaymentTerm.vue'), 
        },
        {
          path: 'ARAccountGroup',
          // component: ARAccountGroup, 
          component: () => import('../views/ARAccountGroup.vue'), 
        },
        {
          path: 'TMHNActivity',
          // component: TMHNActivity, 
          component: () => import('../views/TMHNActivity.vue'),
        },
        {
          path: 'CashAndGL',
          // component: CashAndGL, 
          component: () => import('../views/CashAndGL.vue'),
        },
        {
          path: 'EmployeeStatus',
          // component: EmployeeStatus, 
          component: () => import('../views/EmployeeStatus.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      // component : LoginView
      component: () => import('../views/LoginView.vue'), // Login page component
     
    }
  ]
  
});


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if the route requires authentication
    store.dispatch('checkLogin');

    // Check if the user is authenticated
    if (!store.getters.isLoggedIn) {
      next('/login'); // Redirect to login page if not authenticated
    } else {
      next(); // Proceed to the route
    }
  } else if (to.name === 'Login') {
    // If navigating to the login page, clear store and proceed
    store.dispatch('clearUserData'); // Replace with your Vuex action to clear user data
    next();
  } else {
    next(); // Continue to other routes
  }
});






export default router
