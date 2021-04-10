/*
 * @Author: your name
 * @Date: 2021-04-09 16:25:13
 * @LastEditTime: 2021-04-09 16:38:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tedx\src\utils\adaptive.js
 */
// 设计宽度
const designWidth = 754
// 设计字体大小
const designFontSize = 16

// 向外输出一个获取rem具体数值的接口，以备不时之需
export function getFontSize () {
  const width = document.documentElement.clientWidth
  const height = document.documentElement.clientHeight
  // 处理手机横屏的情况
  const realWidth = Math.max(width, height)
  const fontSize = realWidth * designFontSize / designWidth
  console.log(realWidth)
  return fontSize
}
// 将html元素的fontSize设置为根据屏幕大小动态计算出的值
function adjustFontSize () {
  // 根据计算结果设置rem
  const htmlEle = document.querySelector('html')
  let fontSize = getFontSize()
  htmlEle.style.fontSize = `${fontSize}px`
  // 当屏幕大小发生变化时，重新计算rem
  window.onresize = () => {
    fontSize = getFontSize()
    htmlEle.style.fontSize = `${fontSize}px`
  }
}
// 执行这个函数
adjustFontSize()
console.log('adaptive.js')
