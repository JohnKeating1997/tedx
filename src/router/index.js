import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Recorder from '@/views/recorder'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/recorder',
      name: 'Recorder',
      component: Recorder
    }
  ]
})
