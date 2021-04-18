/*
 * @Author: your name
 * @Date: 2021-04-15 19:46:28
 * @LastEditTime: 2021-04-15 19:50:57
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \tedx\src\utils\wav2mp3.js
 */
const lamejs = require('lamejs')
export function convertToMp3 (wavDataView, recorder) {
  // 获取wav头信息
  const wav = lamejs.WavHeader.readHeader(wavDataView) // 此处其实可以不用去读wav头信息，毕竟有对应的config配置
  const { channels, sampleRate } = wav
  const mp3enc = new lamejs.Mp3Encoder(channels, sampleRate, 128)
  // 获取左右通道数据
  const result = recorder.getChannelData()
  const buffer = []

  const leftData = result.left && new Int16Array(result.left.buffer, 0, result.left.byteLength / 2)
  const rightData = result.right && new Int16Array(result.right.buffer, 0, result.right.byteLength / 2)
  const remaining = leftData.length + (rightData ? rightData.length : 0)

  const maxSamples = 1152
  for (let i = 0; i < remaining; i += maxSamples) {
    const left = leftData.subarray(i, i + maxSamples)
    let right = null
    let mp3buf = null

    if (channels === 2) {
      right = rightData.subarray(i, i + maxSamples)
      mp3buf = mp3enc.encodeBuffer(left, right)
    } else {
      mp3buf = mp3enc.encodeBuffer(left)
    }

    if (mp3buf.length > 0) {
      buffer.push(mp3buf)
    }
  }

  const enc = mp3enc.flush()

  if (enc.length > 0) {
    buffer.push(enc)
  }

  return new Blob(buffer, { type: 'audio/mp3' })
}
