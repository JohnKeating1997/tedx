/*
 * @Author: your name
 * @Date: 2021-04-09 16:25:13
 * @LastEditTime: 2021-04-16 23:22:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tedx\src\utils\adaptive.js
 */
// 设计宽度
const designWidth = 754
// 设计字体大小
const designFontSize = 16
const ratio = 2
// 获取真实rem
function getFontSize (ele) {
  // 经过landscape.js调整，现在html元素经过了旋转
  let width = parseFloat(ele.style.width)
  // 但是真正的大小应该是#view元素，本脚本后于vue的生命周期，所以获取不到#view，只能自己去计算realWidth
  let height = parseFloat(ele.style.height)
  // 兼容手机横屏时，被压缩太小的情况
  const realWidth = Math.min(width, ratio * height)
  // alert(`width`)
  const fontSize = realWidth * designFontSize / designWidth
  console.log('adaptive.js width: ', width)
  console.log('adaptive.js realWidth: ', realWidth)
  console.log('adaptive.js rem: ', fontSize)
  return fontSize
}
// 将html元素的fontSize设置为根据屏幕大小动态计算出的值
function adjustFontSize () {
  // 根据计算结果设置rem
  const htmlEle = document.querySelector('html')
  // 真正装页面的容器
  // const container = document.getElementById('view')
  // 根据container的宽度计算fontSize
  let fontSize = getFontSize(htmlEle)
  // 太小不做处理，防止输入法时页面被极度压缩
  if (fontSize < 8.5) return
  // 然后再作用到htmlEle根元素上
  htmlEle.style.fontSize = `${fontSize}px`
  // 当屏幕大小发生变化时，重新计算rem
  // window.onresize = () => {
  //   fontSize = getFontSize()
  //   if (fontSize < 8.5) return
  //   htmlEle.style.fontSize = `${fontSize}px`
  // }
}
// 执行这个函数
// adjustFontSize()
export default adjustFontSize
console.log('adaptive.js')
