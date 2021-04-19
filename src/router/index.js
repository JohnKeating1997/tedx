/*
 * @Author: your name
 * @Date: 2021-04-08 17:01:07
 * @LastEditTime: 2021-04-19 21:03:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tedx\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import Opening from '@/views/index/opening.vue'
import Index from '@/views/index'
import Edit from '@/views/edit'
import Success from '@/views/submit/success'
import ErrorPage from '@/views/submit/error'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Opening',
      component: Opening
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/success',
      name: 'Success',
      component: Success
    },
    {
      path: '/error',
      name: 'Error',
      component: ErrorPage
    }
  ]
})
