// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import resizeScreen from '@/utils/landscape.js'
import adjustFontSize from '@/utils/adaptive.js'
import store from './store/index'
// css样式
import '@/style/normalize.css'
import '@/style/global.less'

// 初始化页面大小
resizeScreen()
adjustFontSize()
let originalOrientation = window.orientation

// 每次改变页面大小触发
window.onresize = () => {
  if (window.orientation !== originalOrientation) {
    // alert('转向')
    // 如果转向才会重新计算页面大小
    resizeScreen()
    adjustFontSize()
    // 更新orientation
    originalOrientation = window.orientation
    // 重新加载页面才能生效
    window.location.reload()
  }
}
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
