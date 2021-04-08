// 设计宽度
const designWidth = 375
// 设计字体大小
const designFontSize = 16

// 向外输出一个获取rem具体数值的接口，以备不时之需
export function getFontSize () {
  const { clientWidth } = document.documentElement
  const fontSize = clientWidth * designFontSize / designWidth
  return fontSize
}
// 将html元素的fontSize设置为根据屏幕大小动态计算出的值
function adjustFontSize () {
  // 根据计算结果设置rem
  const htmlEle = document.querySelector('html')
  let fontSize = getFontSize()
  htmlEle.style.fontSize = `${fontSize}px`
  // 当屏幕大发生变化时，重新计算rem
  window.onresize = () => {
    fontSize = getFontSize()
    htmlEle.style.fontSize = `${fontSize}px`
  }
}
// 执行这个函数
adjustFontSize()
