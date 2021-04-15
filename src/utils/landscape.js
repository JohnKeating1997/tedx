/*
 * @Author: your name
 * @Date: 2021-04-10 16:05:18
 * @LastEditTime: 2021-04-15 00:30:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tedx\src\utils\landscape.js
 */
/*
强制横屏
*/
// 宽高比
const ratio = 2
export function resizeScreen () {
  const htmlEle = document.querySelector('html')
  // 利用 CSS3 旋转 对根容器逆时针旋转 90 度
  const detectOrient = () => {
    let width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight
    // 优先保证高度100%
    if (width / height > ratio) {
      width = ratio * height
    }
    let style = htmlEle.style.cssText
    if (window.orientation === 90) {
      // 横屏
      // 太窄的不做处理
      if (height < 100) return
      style += 'width:' + width + 'px;' // 注意旋转后的宽高切换
      style += 'height:' + height + 'px;'
      style += '-webkit-transform: rotate(0); transform: rotate(0);'
      style += '-webkit-transform-origin: 0 0;'
      style += 'transform-origin: 0 0;'
    } else if (window.orientation === 0) {
      // 竖屏
      // 太窄的不做处理
      if (height < 500) return
      style += 'width:' + height + 'px;'
      style += 'height:' + width + 'px;'
      style +=
        '-webkit-transform: rotate(90deg); transform: rotate(90deg);'
      // 注意旋转中点的处理
      style +=
        '-webkit-transform-origin: ' +
        width / 2 +
        'px ' +
        width / 2 +
        'px;'
      style += 'transform-origin: ' + width / 2 + 'px ' + width / 2 + 'px;'
    }
    htmlEle.style.cssText = style
  }
  detectOrient()
}

// resizeScreen()
export default resizeScreen
console.log('landscape.js')
