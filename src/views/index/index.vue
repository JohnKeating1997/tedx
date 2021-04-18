<template>
  <div id="view"
    :style="{ 'backgroundImage' : 'url(' + background + ')' }"
  >
    <div
      id="shade"
      :style="{ 'opacity' : opacity, 'filter' : `alpha(opacity=${opacity * 100})`}"
    ></div>
    <!-- <img id="logo" :src="logo" alt="图片加载中"> -->
    <img id="dialog" :src="dialogInSpace" alt="图片加载中">
    <img id="button-mic" :class="shrink" :src="buttonIcon" alt="图片加载中" @mousedown="handleMouseDown" @mouseup="handleMouseUp">
    <p id="info" :class="this.lang === 'CN' ? 'chinese' : 'english'">{{info}}</p>
    <canvas id="canvas" width="754" height="98"></canvas>
  </div>
</template>

<script>
import background from '@/assets/videos/background.gif'
import backgroundStop from '@/assets/videos/background-stop.jpg'
// import logo from '@/assets/images/TEDxHangzhou Logo Copy 2.svg'
import dialogInSpace from '@/assets/images/#DialogueInSpace.svg'
import buttonMic from '@/assets/images/Button-mic.svg'
import buttonStop from '@/assets/images/Button-stop.svg'
import Recorder from 'js-audio-recorder'
import { mapGetters } from 'vuex'
export default {
  name: 'Index',
  data () {
    return {
      // svg
      // logo,
      dialogInSpace,
      // buttonIcon: buttonMic,
      // background,
      // 遮罩层
      // opacity: 0.35,
      // 按钮缩放
      shrink: '',
      // 录音时长
      durationTime: 'NaN',
      // 波浪图
      drawRecordId: null,
      oCancas: null,
      ctx: null,
      // 录音状态，用来切换界面
      status: 'beforeRecord',
      // 用来计时15s
      timer: null
    }
  },
  mounted () {
    this.startCanvas()
    // 获取录音时长的勾子
    this.recorder.onprogress = (params) => {
      const num = Math.ceil(params.duration)
      // 不满10位要补0
      this.durationTime = num < 10 ? `0${num}` : `${num}`
      alert(params.duration)
    }
    // 从路由获取状态
    if (this.$route.params.status === 'recording') {
      // alert('recording')
      // 如果直接是recording的状态
      this.handleMouseDown()
      this.handleMouseUp()
    }
  },
  computed: {
    ...mapGetters(['recorder', 'lang']),
    // 波形图下方的info文案
    info () {
      const text = this.lang === 'CN' ? '轻触按钮， 留下你的声音~（最长15秒）' : 'Tap the button to start recording (maximum 15s)'
      return this.durationTime === 'NaN' ? text : `00:${this.durationTime}`
    },
    background () {
      return this.status === 'beforeRecord' ? background : backgroundStop
    },
    opacity () {
      return this.status === 'beforeRecord' ? 0.35 : 0.85
    },
    buttonIcon () {
      return this.status === 'beforeRecord' ? buttonMic : buttonStop
    }
  },
  methods: {
    handleMouseDown () {
      if (this.status === 'beforeRecord') {
        // 改变按钮大小
        this.shrink = 'shrink'
      }
    },
    handleMouseUp () {
      if (this.status === 'beforeRecord') {
        // 恢复按钮大小
        setTimeout(() => {
          this.shrink = ''
          // this.buttonIcon = buttonStop
        }, 100)
        // 录音开始
        Recorder.getPermission().then(() => {
          console.log('开始录音')
          this.recorder.start().then(() => {
            alert('录音成功！')
            alert(this.recorder)
            this.drawRecord()
          }, (error) => {
            // 已经开始过了，不用再开始了
            alert(`异常了,${error.name}:${error.message}`)
            this.drawRecord()
          }) // 开始录音
        }, (error) => {
          // 获取权限出错
          alert(`${error.name} : ${error.message}`)
          console.log(`${error.name} : ${error.message}`)
        })
        // 状态切换到录音中
        this.status = 'recording'
        // 15s后自动停止录音，跳转
        this.timer = setTimeout(() => {
          // 停止录音
          this.recorder.stop()
          // 跳转到编辑信息页面
          this.$router.push({path: '/edit'})
        }, 15000)
      } else {
        // 停止录音
        this.recorder.stop()
        // 清楚掉之前的setTimeOut
        clearTimeout(this.timer)
        this.timer = null
        // 跳转到编辑信息页面
        this.$router.push({path: '/edit'})
      }
    },
    // 波浪图配置
    startCanvas () {
      this.oCanvas = document.getElementById('canvas')
      this.ctx = this.oCanvas.getContext('2d')
    },
    drawRecord () {
      // 用requestAnimationFrame稳定60fps绘制
      this.drawRecordId = window.requestAnimationFrame(this.drawRecord)
      // 清空画布
      this.ctx.clearRect(0, 0, this.oCanvas.width, this.oCanvas.height)
      // 实时获取音频大小数据
      let dataArray = this.recorder.getRecordAnalyseData()
      let bufferLength = dataArray.length

      // 填充背景色
      this.ctx.fillStyle = 'rgba(0,0,0,0)'
      this.ctx.fillRect(0, 0, this.oCanvas.width, this.oCanvas.height)

      // 设定波形绘制颜色
      this.ctx.lineWidth = 1
      this.ctx.strokeStyle = '#fff'

      this.ctx.beginPath()

      var sliceWidth = this.oCanvas.width * 1.0 / bufferLength // 一个点占多少位置，共有bufferLength个点要绘制
      var x = 0 // 绘制点的x轴位置

      for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0
        var y = v * this.oCanvas.height / 2

        if (i === 0) {
          // 第一个点
          this.ctx.moveTo(x, y)
        } else {
          // 剩余的点
          this.ctx.lineTo(x, y)
        }
        // 依次平移，绘制所有点
        x += sliceWidth
      }

      this.ctx.lineTo(this.oCanvas.width, this.oCanvas.height / 2)
      this.ctx.stroke()
    }
  }
}
</script>

<style lang="less" scoped>
  #view{
    width:calc(min(100vmin*2,100vmax));
    height:calc(min(100vmin, 100vmax / 2));
    margin: 0 auto;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
    z-index: 1;
    #shade{
      position: absolute;
      top: 0%;
      left: 0%;
      width: 100%;
      height: 100%;
      z-index: 2;
      // -moz-opacity: 0.353;
      // opacity: .353;
      // filter: alpha(opacity=35);
      background: #000;
    }
    #logo{
      z-index: 3;
      position: absolute;
      left:(20/16rem);
      top:(24/16rem);
    }
    #dialog{
      z-index: 3;
      position: absolute;
      right:(20.34/16rem);
      top:(23.8/16rem);
    }
    #button-mic{
      z-index: 5;
      position:absolute;
      left:50%;
      top:50%;
      transform: translate(-50%,-50%);
      width: (64/16rem);
      &.shrink{
        width: (64/16*0.8rem)
      }
    }
    #info{
      z-index: 3;
      position:absolute;
      bottom:(25/16rem);
      left: 50%;
      transform: translate(-50%,-50%);
      &.chinese {
        width: (500/16rem);
        letter-spacing: (10/16rem);
        font-size: (14/16rem);
      }
      &.english {
        width: (600/16rem);
        letter-spacing: (2.5/16rem);
        font-size: (14/16rem);
      }
    }
    #canvas{
      position: relative;
      top: 73%;
      transform: translateY(-50%);
      width: 100%;
      height: (97.72/16rem);
      z-index: 4;
    }
    #duration-time{
      position: absolute;
      top: 0;
      z-index:3;
    }
  }

</style>
