/*
 * @Author: your name
 * @Date: 2021-04-11 21:58:37
 * @LastEditTime: 2021-04-11 22:40:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tedx\src\store\modules\language.js
 */
import * as TYPES from '../mutation-types'

const language = {
  state: {
    lang: 'CN'
  },
  mutations: {
    TOGGLE_LANGUAGE: (state, lang) => {
      state.lang = lang
    }
  },
  actions: {
    toggleLanguage ({commit}, lang) {
      commit(TYPES.TOGGLE_LANGUAGE, lang)
    }
  }
}

export default language
