import Vuex from 'vuex'
import Vue from 'vue'

import getters from './getters'

Vue.use(Vuex)

const modules = {}
const requireModule = require.context('./modules', false, /^.*\.js$/)
requireModule.keys().forEach(name => {
  // 获取组件的命名(横杠转驼峰)
  modules[name.replace(/(\.\/|\.js)/g, '')] = requireModule(name).default
})

export default new Vuex.Store({modules, getters})
