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
    <div id="wave" :style="{ 'backgroundImage' : 'url(' + waveGif + ')' }"></div>
    <img id="button-mic" :class="shrink" :src="buttonIcon" alt="图片加载中" @mousedown="handleMouseDown" @mouseup="handleMouseUp">
    <p id="infoLeft">{{infoLeft}}</p>
    <p id="infoRight">{{infoRight}}</p>
    <p id="info" :class="this.lang === 'CN' ? 'chinese' : 'english'">{{info}}</p>
  </div>
</template>

<script>
import background from '@/assets/videos/background.gif'
import backgroundStop from '@/assets/videos/background-stop.jpg'
import wave from '@/assets/images/wave.gif'
import dialogInSpace from '@/assets/images/#DialogueInSpace.svg'
import buttonMic from '@/assets/images/Button-mic.svg'
import buttonStop from '@/assets/images/Button-stop.svg'
import { mapGetters } from 'vuex'
import Recorder from 'recorder-core'

//需要使用到的音频格式编码引擎的js文件统统加载进来
import 'recorder-core/src/engine/mp3'
import 'recorder-core/src/engine/mp3-engine'

//以上三个也可以合并使用压缩好的recorder.xxx.min.js
//比如 import Recorder from 'recorder-core/recorder.mp3.min' //已包含recorder-core和mp3格式支持
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
      timer: null,
      // rec实例
      rec: null,
      wave: null
    }
  },
  mounted () {
    // this.startCanvas()
    // 获取录音时长的勾子
    // this.recorder.onprogress = (params) => {
    //   const num = Math.ceil(params.duration)
    //   // 不满10位要补0
    //   this.durationTime = num < 10 ? `0${num}` : `${num}`
    // }
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
      if (this.durationTime === 'NaN') {
        return ''
      }
      const num = this.durationTime < 10 ? `00:0${this.durationTime}` : `00:${this.durationTime}`
      return num
    },
    infoLeft () {
      if (this.durationTime === 'NaN') {
        return this.lang === 'CN' ? '轻触按钮， ' : 'Tap the button'
      }
      return ''
    },
    infoRight () {
      if (this.durationTime === 'NaN') {
        return this.lang === 'CN' ? '留下你的声音~（最长15秒）' : 'to start recording (maximum 15s)'
      }
      return ''
    },
    background () {
      return this.status === 'beforeRecord' ? background : backgroundStop
    },
    opacity () {
      return this.status === 'beforeRecord' ? 0.35 : 0.85
    },
    buttonIcon () {
      return this.status === 'beforeRecord' ? buttonMic : buttonStop
    }, 
    waveGif () {
      return this.status === 'beforeRecord' ? '' : wave
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
        this.recOpen(() => {
          this.recStart()
          // alert('开始录音成功')
          // 状态切换到录音中
          this.status = 'recording'
          // 15s后自动停止录音，跳转
          this.timer = setTimeout(() => {
            // 停止录音,生成音频url并跳转到编辑页面
            this.recStop()
          }, 16000)
        })
      } else {
        // 清楚掉之前的setTimeOut
        clearTimeout(this.timer)
        this.timer = null
        // 停止录音,生成音频url并跳转到编辑页面
        this.recStop()
      }
    },
    // 打开录音机
    recOpen (success) {
      this.rec=Recorder({
      type:"mp3",sampleRate:16000,bitRate:16 //mp3格式，指定采样率hz、比特率kbps，其他参数使用默认配置；注意：是数字的参数必须提供数字，不要用字符串；需要使用的type类型，需提前把格式支持文件加载进来，比如使用wav格式需要提前加载wav.js编码引擎
      ,onProcess:(buffers,powerLevel,bufferDuration,bufferSampleRate,newBufferIdx,asyncEnd) => {
          // console.log(buffers)
          //录音实时回调，大约1秒调用12次本回调
          //可利用extensions/waveview.js扩展实时绘制波形
          //可利用extensions/sonic.js扩展实时变速变调，此扩展计算量巨大，onProcess需要返回true开启异步模式
      }
      })
      this.rec.open( () => {
        success && success()
      }, function (msg, isUserNotAllow){
          console.log((isUserNotAllow?"UserNotAllow，":"")+"无法录音:"+msg)
      })
    },
    recStart(){//打开了录音后才能进行start、stop调用
      setInterval( () => {
        if(this.durationTime === 'NaN') {
          this.durationTime = 0
        } else {
          this.durationTime++
        }
      }, 1000)
      this.rec.start()
      // 给用户看的计时，每1s刷新一次
    },
    recStop(){
      this.rec.stop((blob,duration) => {
          // console.log(blob,(window.URL||webkitURL).createObjectURL(blob),"时长:"+duration+"ms");
          this.rec.close();//释放录音资源，当然可以不释放，后面可以连续调用start；但不释放时系统或浏览器会一直提示在录音，最佳操作是录完就close掉
          this.rec=null;
          
          //已经拿到blob文件对象想干嘛就干嘛：立即播放、上传
          
          /*** 【立即播放例子】 ***/
          // var audio=document.createElement("audio");
          // audio.controls=true;
          // document.body.appendChild(audio);
          //简单利用URL生成播放地址，注意不用了时需要revokeObjectURL，否则霸占内存
          const URL = (window.URL||webkitURL).createObjectURL(blob);
          this.$router.push({name:'Edit', params:{playURL:URL,duration:duration,blob:blob}})
        },(msg) => {
          console.log("录音失败:"+msg);
          this.rec.close();//可以通过stop方法的第3个参数来自动调用close
          this.rec=null;
        }
      )
    }
    // handleStartTest() {
    //   console.log('test')
    // }
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
    #testPlayer{
      position: absolute;
      z-index: 100;
      top: 0;
      left: 200px;
    }
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
    #wave{
      z-index: 2;
      position:absolute;
      left:50%;
      top:50%;
      transform: translate(-50%,-50%);
      width:(300/16rem);
      height:(300/16rem);
      background-size: contain;
      background-position: center;
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
    #infoLeft {
      z-index: 3;
      position:absolute;
      top:50%;
      right: 56%;
      transform: translateY(-50%);
      font-size: (14/16rem);
    }
    #infoRight {
      z-index: 3;
      position:absolute;
      top:50%;
      left: 56%;
      transform: translateY(-50%);
      font-size: (14/16rem);
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
    // #canvas{
    //   position: relative;
    //   top: 73%;
    //   transform: translateY(-50%);
    //   width: 100%;
    //   height: (97.72/16rem);
    //   z-index: 4;
    // }
    #duration-time{
      position: absolute;
      top: 0;
      z-index:3;
    }
  }

</style>
