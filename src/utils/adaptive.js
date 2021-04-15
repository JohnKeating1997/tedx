/*
 * @Author: your name
 * @Date: 2021-04-09 16:25:13
 * @LastEditTime: 2021-04-15 00:26:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tedx\src\utils\adaptive.js
 */
// 设计宽度
const designWidth = 754
// 设计字体大小
const designFontSize = 16
// const ratio = 2
// 获取真实rem
function getFontSize (htmlEle) {
  // 经过landscape.js调整，现在html元素的大小就是整个页面正确的大小
  let width = parseFloat(htmlEle.style.width)
  // let height = htmlEle.style.height
  // 兼容手机横屏时，被压缩太小的情况
  // const realWidth = Math.min(width, ratio * height)
  const fontSize = width * designFontSize / designWidth
  console.log('width: ', width)
  console.log('rem: ', fontSize)
  return fontSize
}
// 将html元素的fontSize设置为根据屏幕大小动态计算出的值
function adjustFontSize () {
  // 根据计算结果设置rem
  const htmlEle = document.querySelector('html')
  let fontSize = getFontSize(htmlEle)
  // 太小不做处理，防止输入法时页面被极度压缩
  if (fontSize < 8.5) return
  htmlEle.style.fontSize = `${fontSize}px`
  // 当屏幕大小发生变化时，重新计算rem
  window.onresize = () => {
    fontSize = getFontSize()
    if (fontSize < 8.5) return
    htmlEle.style.fontSize = `${fontSize}px`
  }
}
// 执行这个函数
// adjustFontSize()
export default adjustFontSize
console.log('adaptive.js')
