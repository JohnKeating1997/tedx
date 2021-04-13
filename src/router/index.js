/*
 * @Author: your name
 * @Date: 2021-04-08 17:01:07
 * @LastEditTime: 2021-04-13 15:59:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tedx\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import Opening from '@/views/index/opening.vue'
import Index from '@/views/index'
import Recorder from '@/views/recorder'
import Edit from '@/views/edit'
import Success from '@/views/submit/success'
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
      path: '/recorder',
      name: 'Recorder',
      component: Recorder
    }
  ]
})
