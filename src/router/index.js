import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Users from '@/components/Users.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    //登陆页
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  //主页
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
   //主页
   {
    path: '/users',
    name: 'Users',
    component: Users,
  },
  ],
})
