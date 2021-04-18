/*
 * @Author: your name
 * @Date: 2021-04-10 16:05:18
 * @LastEditTime: 2021-04-15 19:46:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tedx\src\utils\recorder.js
 */
// 创建录音实例
import Recorder from 'js-audio-recorder'
const recorder = new Recorder({
  sampleBits: 8, // 采样位数，支持 8 或 16，默认是16
  sampleRate: 11025, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
  numChannels: 1 // 声道，支持 1 或 2， 默认是1
})

export default recorder
