<template>
  <div>
    <p>
      <span>录音上传</span>
    </p>
    <div style="font-size:14px">
      <h3>录音时长：{{recorder&&recorder.duration.toFixed(4)}}</h3>
      <br />
      <Button type="primary" @click="handleStart">开始录音</Button>
      <Button type="info" @click="handlePause">暂停录音</Button>
      <Button type="success" @click="handleResume">继续录音</Button>
      <Button type="warning" @click="handleStop">停止录音</Button>
      <br />
      <br />
      <h3>播放时长：{{recorder&&(playTime>recorder.duration?recorder.duration.toFixed(4):playTime.toFixed(4))}}</h3>
      <br />
      <Button type="primary" @click="handlePlay">播放录音</Button>
      <Button type="info" @click="handlePausePlay">暂停播放</Button>
      <Button type="success" @click="handleResumePlay">继续播放</Button>
      <Button type="warning" @click="handleStopPlay">停止播放</Button>
      <Button type="error" @click="handleDestroy">销毁录音</Button>
    </div>
    <div slot="footer">
      <Button style="margin-left:5px;" type="default" @click="uploadRecordModal=false">取消</Button>
      <Button style="margin-left:5px;" type="primary" @click="uploadRecord">上传</Button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Recorder from 'js-audio-recorder'
export default {
  data () {
    return {
      playTime: 0,
      // 波浪图-录音
      drawRecordId: null,
      oCanvas: null,
      ctx: null
    }
  },
  created () {
  },
  computed: {
    ...mapGetters(['recorder'])
  },
  methods: {
    // 开始录音
    handleStart () {
      Recorder.getPermission().then(() => {
        console.log(`2. ${this}`)
        console.log('开始录音')
        this.recorder.start() // 开始录音
      }, (error) => {
        // this.$Message.info('请先允许该网页使用麦克风')
        alert(`${error.name} : ${error.message}`)
        console.log(`${error.name} : ${error.message}`)
      })
    },
    handlePause () {
      console.log('暂停录音')
      this.recorder.pause() // 暂停录音
    },
    handleResume () {
      console.log('恢复录音')
      this.recorder.resume() // 恢复录音
    },
    handleStop () {
      console.log('停止录音')
      this.recorder.stop() // 停止录音
    },
    handlePlay () {
      console.log('播放录音')
      this.recorder.play() // 播放录音

      // 播放时长
      this.timer = setInterval(() => {
        try {
          this.playTime = this.recorder.getPlayTime()
        } catch (error) {
          this.timer = null
        }
      }, 100)
    },
    handlePausePlay () {
      console.log('暂停播放')
      this.recorder.pausePlay() // 暂停播放

      // 播放时长
      this.playTime = this.recorder.getPlayTime()
      this.time = null
    },
    handleResumePlay () {
      console.log('恢复播放')
      this.recorder.resumePlay() // 恢复播放

      // 播放时长
      this.timer = setInterval(() => {
        try {
          this.playTime = this.recorder.getPlayTime()
        } catch (error) {
          this.timer = null
        }
      }, 100)
    },
    handleStopPlay () {
      console.log('停止播放')
      this.recorder.stopPlay() // 停止播放

      // 播放时长
      this.playTime = this.recorder.getPlayTime()
      this.timer = null
    },
    handleDestroy () {
      console.log('销毁实例')
      this.recorder.destroy() // 毁实例
      this.timer = null
    },
    uploadRecord () {
      if (this.recorder == null || this.recorder.duration === 0) {
        // this.$Message.error('请先录音')
        alert('请先录音')
        return false
      }
      this.recorder.pause() // 暂停录音
      this.timer = null
      console.log('上传录音')// 上传录音
      var formData = new FormData()
      var blob = this.recorder.getWAVBlob()// 获取wav格式音频数据
      // 此处获取到blob对象后需要设置fileName满足当前项目上传需求，其它项目可直接传把blob作为file塞入formData
      var newbolb = new Blob([blob], { type: 'audio/wav' })
      var fileOfBlob = new File([newbolb], new Date().getTime() + '.wav')
      formData.append('file', fileOfBlob)
      // 本地公共上传接口获取到服务器地址保存即可
      // const axios = require('axios')
      // axios.post(this.resource, formData).then(res => {
      //   console.log(res.data.data[0].url)
      //   // 开始调用保存的方法
      //   this.uploadRecordModal = false
      // })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
