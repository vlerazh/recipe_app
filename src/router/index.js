import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddRecipe from '@/components/AddRecipe'
import EditRecipe from '@/components/EditRecipe'
import Login from '@/components/auth/Login'
import Signup from '@/components/auth/Signup'
import UserProfile from '@/components/profile/UserProfile'
import EditProfile from '@/components/profile/EditProfile'
import firebase from 'firebase'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path:'/addRecipe',
      name:'AddRecipe',
      component: AddRecipe,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/editRecipe/:recipe_slug',
      name:'EditRecipe',
      component: EditRecipe,  
      meta: {
        requiresAuth: true
      },    
    },
    {
      path:'/login',
      name:'Login',
      component: Login
    },
    {
      path:'/signup',
      name:'Signup',
      component: Signup
    },
    {
      path:'/profile/:id',
      name: 'UserProfile',
      component: UserProfile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path:'/edit-profile/:id',
      name:'EditProfile',
      component: EditProfile,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to,from,next) =>{
  //check to see if route requires auth
  if(to.matched.some(rec => rec.meta.requiresAuth)){
    //check auth state of user
    let user = firebase.auth().currentUser
    if(user){
      //user signed in , proceed to route
      next()
    }else{
      //no user signed in, redirect to login 
      next({name: 'Login'})
    }
  }else{
    next()
  }
})

export default router