/*
 * @Author: your name
 * @Date: 2021-04-10 16:05:18
 * @LastEditTime: 2021-04-19 20:05:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tedx\src\utils\landscape.js
 */
/*
强制横屏
*/
// 宽高比
// const ratio = 2
export function resizeScreen (orientation) {
  // 根元素
  const htmlEle = document.documentElement
  // 真实的页面容器
  // const container = document.getElementById('view')
  // 利用 CSS3 旋转 对根容器逆时针旋转 90 度
  const detectOrient = (orientation) => {
    // 这里用window.innerWidth, window.innerHeight 会鬼畜
    let width = window.screen.availWidth
    let height = window.screen.availHeight
    console.log('landscape.js innerWidth', width)
    console.log('landscape.js innerHeight', height)
    let style = htmlEle.style.cssText
    if (orientation === 'landscape' || width >= height) {
      /*
        横屏
      */
      // let containerWidth = width
      // let containerHeight = height
      // if (containerWidth / containerHeight > ratio) {
      // // 适应导航栏，优先保证container高度100%
      //   containerWidth = ratio * containerHeight
      // }
      // 横屏高度小于100 肯定是输入法压的，要避免
      if (height < 100) return
      // 先改变html元素的样式
      let styleText = `width:${width}px;`
      styleText += `height:${height}px;`
      styleText += `-webkit-transform: rotate(0); transform: rotate(0);`
      styleText += '-webkit-transform-origin: 0 0; transform-origin: 0 0;'
      style += styleText
      // 然后设置container的大小
      // container.style.cssText += `width:${containerWidth}; height:${containerHeight};`
    } else if (orientation === 'portrait' || width < height) {
      /*
        竖屏
      */
      // let containerWidth = height
      // let containerHeight = width
      // 竖屏高度小于500 肯定是输入法压的，要避免
      if (height < 500) return
      // if (containerWidth / containerHeight > ratio) {
      // // 适应导航栏，优先保证container高度100%
      //   containerWidth = ratio * containerHeight
      // }
      // 先改变html元素的样式
      let styleText = `width:${height}px;`
      styleText += `height:${width}px;`
      styleText += '-webkit-transform: rotate(90deg); transform: rotate(90deg);'
      // 注意旋转中点的处理
      styleText +=
        '-webkit-transform-origin: ' +
        width / 2 +
        'px ' +
        width / 2 +
        'px;'
      styleText += 'transform-origin: ' + width / 2 + 'px ' + width / 2 + 'px;'
      style += styleText
      // 然后设置container的大小
      // container.style.cssText += `width:${containerWidth}; height:${containerHeight};`
    }
    htmlEle.style.cssText = style
  }
  detectOrient(orientation)
}

// resizeScreen()
export default resizeScreen
console.log('landscape.js')
