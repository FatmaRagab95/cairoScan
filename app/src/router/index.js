import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'

import addUnit from '@/components/endoresment/addUnit'
import Units from '@/components/endoresment/Units'
import addPatient from '@/components/endoresment/add_patient'
import viewPatients from '@/components/endoresment/viewPatients'

Vue.use(Router)

const router = new Router({
  // mode:'history',
  routes: [
    {
      path:'/login',
      name:'login',
      component:login,
      meta: {
      }
    },    
    {
      path:'/',
      name:'Dashboard',
      component:home,
      meta: {
        requiresAuth:true,
        cat:'Endoresment'
      }
    },
    {
        path: '/add_Unit',
        name: 'Add Units Details',
        component: addUnit,
        meta: {
          requiresAuth:true,
          cat:'Endoresment'
        }
    },
    {
        path: '/Units',
        name: 'Units',
        component: Units,
        meta: {
          requiresAuth:true,
          cat:'Endoresment'
        }
    },
    {
        path: '/addmition',
        name: 'Addmition Form',
        component: addPatient,
        meta: {
          requiresAuth:true,
          cat:'Endoresment'
        }
    },
    {
        path: '/viewPatients',
        name: 'Patients',
        component: viewPatients,
        meta: {
          requiresAuth:true,
          cat:'Endoresment'
        }
    }
  ]
});

router.beforeEach((to,from,next) => {
  // check to see if route requires auth
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // check auth state of user
    let user = localStorage.getItem('user');
    if (user) {
      // user signed in, proceed to route
      next();
    } else {
      // no user signed in, redirect to login
      next({name:'login'})
    }
  } else {
    next()
  }
});

export default router
