import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/Home'


import Create_Training from '@/components/TrainingPages/Create_Training'

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
      name:'Home',
      component:home,
      meta: {
        requiresAuth:true,
        cat:'Training'
      }
    },
    {
        path: '/Create_Training',
        name: 'New Lecture',
        component: Create_Training,
        meta: {
          requiresAuth:true,
          cat:'Training'
        }
    },
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
