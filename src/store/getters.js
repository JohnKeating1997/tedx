/*
 * @Author: your name
 * @Date: 2021-04-10 16:05:18
 * @LastEditTime: 2021-04-11 22:24:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tedx\src\store\getters.js
 */
const getters = {
  recorder: state => state.recorder.recorderInstance,
  lang: state => state.language.lang
}

export default getters
