/*
 * @Author: your name
 * @Date: 2021-04-15 10:01:50
 * @LastEditTime: 2021-04-15 12:34:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tedx\src\utils\savaImage.js
 */
import html2canvas from 'html2canvas'
export const longPress = (dom, fn) => {
  let timeout = 0
  // const $this = this
  dom.addEventListener('touchstart', () => {
    alert('touchstart')
    timeout = setTimeout(fn.bind(dom), 1000)
  }, false)
  dom.addEventListener('touchend', () => {
    clearTimeout(timeout)
  }, false)
  // for (let i = 0; i < $this.length; i++) {
  //   $this[i].addEventListener('touchstart', () => {
  //     timeout = setTimeout(fn, 800) // 长按时间超过800ms，则执行传入的方法
  //   }, false)
  //   $this[i].addEventListener('touchend', () => {
  //     clearTimeout(timeout) // 长按时间少于800ms，不会执行传入的方法
  //   }, false)
  // }
}
const canvas2Image = (canvas, width, height) => {
  const retCanvas = document.createElement('canvas')
  const retCtx = retCanvas.getContext('2d')
  retCanvas.width = width
  retCanvas.height = height
  retCtx.drawImage(canvas, 0, 0, width, height, 0, 0, width, height)
  const img = document.createElement('img')
  img.src = retCanvas.toDataURL('image/jpeg') // 可以根据需要更改格式
  return img
}

export const saveImg = async (dom) => {
  // 创建一个新的canvas
  const Canvas = document.createElement('canvas')
  const width = 264 // 设计宽
  const height = 334 // 设计高
  const domWidth = parseFloat(window.getComputedStyle(dom, null).width.split('p')[0])
  console.log('domWidth', domWidth)
  const scale = width / domWidth
  // alert(scale)
  // const scale = window.devicePixelRatio // 设备的devicePixelRatio

  // 将Canvas画布放大scale倍，然后放在小的屏幕里，解决模糊问题
  Canvas.width = width * scale * 2
  Canvas.height = height * scale * 2
  Canvas.getContext('2d').scale(scale * 2, scale * 2)
  // 获取dom位置
  const rect = dom.getBoundingClientRect()

  // 转成canvas对象
  const canvas = await html2canvas(dom, {
    x: rect.left,
    y: rect.top,
    canvas: Canvas,
    scale,
    // scrollY: 0,
    // scrollX: 0,
    useCORS: true,
    logging: true,
    width: width * scale + 'px',
    hegiht: height * scale + 'px'
  })
  const context = canvas.getContext('2d')
  // 关闭抗锯齿形
  context.mozImageSmoothingEnabled = false
  context.webkitImageSmoothingEnabled = false
  context.msImageSmoothingEnabled = false
  context.imageSmoothingEnabled = false
  // canvas转化为图片
  const img = canvas2Image(canvas, canvas.width, canvas.height)
  // console.log(img.src)
  return img.src
  // document.body.appendChild(img)
  // img.style.cssText = 'width:100%;height:100%;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;'
}
