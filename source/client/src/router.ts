import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import FileCloud from './views/FileCloud.vue'
import Login from './views/Login.vue'
import Todo from './views/Todo.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/fileCloud',
      name: 'fileCloud',
      component: FileCloud
    },
    {
      path: '/todo',
      name: 'todo',
      component: Todo
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
