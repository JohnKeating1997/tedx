<template>
  <div id="view"
    :style="{ 'backgroundImage' : 'url(' + background + ')' }"
  >
    <div
      id="shade"
      :style="{ 'opacity' : opacity, 'filter' : `alpha(opacity=${opacity * 100})`}"
    ></div>
    <img id="logo" :src="logo" alt="图片加载中">
    <img id="dialog" :src="dialogInSpace" alt="图片加载中">
    <img id="button-mic" :class="shrink" :src="buttonIcon" alt="图片加载中" @mousedown="handleMouseDown" @mouseup="handleMouseUp">
    <p id="info">轻触按钮， 留下你的声音~（最长15秒）</p>
    <canvas id="canvas" width="754" height="98"></canvas>
  </div>
</template>

<script>
import background from '@/assets/videos/background.gif'
import backgroundStop from '@/assets/videos/background-stop.jpg'
import logo from '@/assets/images/TEDxHangzhou Logo Copy 2.svg'
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
      logo,
      dialogInSpace,
      buttonIcon: buttonMic,
      background,
      // 遮罩层
      opacity: 0.35,
      // 按钮缩放
      shrink: '',
      // 波浪图
      drawRecordId: null,
      oCancas: null,
      ctx: null
    }
  },
  mounted () {
    this.startCanvas()
  },
  computed: {
    ...mapGetters(['recorder'])
  },
  methods: {
    handleMouseDown () {
      // 更换背景图
      this.background = backgroundStop
      // 改变遮罩透明度
      this.opacity = 0.85
      // 改变按钮大小
      this.shrink = 'shrink'
    },
    handleMouseUp () {
      // 恢复按钮大小
      setTimeout(() => {
        this.shrink = ''
        this.buttonIcon = buttonStop
      }, 100)
      // 录音开始
      Recorder.getPermission().then(() => {
        console.log(`2. ${this}`)
        console.log('开始录音')
        this.recorder.start().then(() => {
          // 绘制波形图
          // setInterval(() => {
          //   this.drawRecord()
          // }, 200)
          this.drawRecord()
        }, (error) => {
          // 录音出错
          console.log(`${error.name} : ${error.message}`)
        }) // 开始录音
      }, (error) => {
        alert(`${error.name} : ${error.message}`)
        console.log(`${error.name} : ${error.message}`)
      })
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
    height:100vmin;
    margin: 0 auto;
    // background-image: url('../../assets/videos/background.gif');
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
      width: (500/16rem);
      position:absolute;
      bottom:(25/16rem);
      left: 50%;
      transform: translate(-50%,-50%);
      letter-spacing: (10/16rem);
      font-size: (14/16rem);
    }
    #canvas{
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      height: (97.72/16rem);
      z-index: 4;
    }
  }

</style>
