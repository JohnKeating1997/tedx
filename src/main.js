/*
 * @Author: your name
 * @Date: 2021-04-10 16:05:18
 * @LastEditTime: 2021-04-19 14:15:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tedx\src\main.js
 */
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
let ratio = window.innerWidth / window.innerHeight

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
let flag = true
// 每次改变页面大小触发
window.onresize = () => {
  // alert('window.availHeight: ' + window.screen.availHeight)
  // alert('window.innerHeight: ' + window.innerHeight)
  const curRatio = window.innerWidth / window.innerHeight
  if (curRatio !== ratio) {
    if (curRatio < 1 && window.innerWidth < 500) return
    if (curRatio > 1 && window.innerHeight < 150) return
    // alert('window.availHeight: ' + window.screen.availHeight)
    // 如果转向才会重新计算页面大小
    try {
      resizeScreen()
      adjustFontSize()
      // 更新orientation
      ratio = window.innerWidth / window.innerHeight
      // 重新加载页面才能生效
      // window.location.reload()
      // alert('转向')
      // console.log(app.$forceUpdate)
      // app.$forceUpdate()
      const tmp = parseFloat(getComputedStyle(document.documentElement, null).height.split('p')[0])
      document.documentElement.style.height = flag ? `${tmp - 1}px` : `${tmp + 1}px`
      document.documentElement.style.height = `${tmp}`
      flag = !flag
    } catch (err) {
      alert(err)
    }
  }
}
