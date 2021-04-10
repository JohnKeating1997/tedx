<template>
  <div id="view"
    :style="{ 'backgroundImage' : 'url(' + background + ')' }"
  >
    <div id="shade"></div>
    <img id="logo" :src="logo" alt="图片加载中">
    <img id="dialog" :src="dialogInSpace" alt="图片加载中">
    <img id="button-mic" :src="buttonMic" alt="图片加载中" @click="handleStart">
    <p id="info">轻触按钮， 留下你的声音~（最长15秒）</p>
  </div>
</template>

<script>
import background from '@/assets/videos/background.gif'
import backgroundStop from '@/assets/videos/background-stop.jpg'
import logo from '@/assets/images/TEDxHangzhou Logo Copy 2.svg'
import dialogInSpace from '@/assets/images/#DialogueInSpace.svg'
import buttonMic from '@/assets/images/Button-mic.svg'
import Recorder from 'js-audio-recorder'
import { mapGetters } from 'vuex'
export default {
  name: 'Index',
  data () {
    return {
      // svg
      logo,
      dialogInSpace,
      buttonMic,
      background
    }
  },
  computed: {
    ...mapGetters(['recorder'])
  },
  methods: {
    handleStart () {
      // 更换背景图
      this.background = backgroundStop
      // 改变遮罩透明度
      const shade = document.getElementById('shade')
      shade.style.opacity = '.854'
      shade.style.filter = 'alpha(opacity=85)'
      Recorder.getPermission().then(() => {
        console.log(`2. ${this}`)
        console.log('开始录音')
        this.recorder.start() // 开始录音
      }, (error) => {
        // this.$Message.info('请先允许该网页使用麦克风')
        alert(`${error.name} : ${error.message}`)
        console.log(`${error.name} : ${error.message}`)
      })
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
      opacity: .353;
      filter: alpha(opacity=35);
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
      z-index: 3;
      position:absolute;
      left:50%;
      top:50%;
      transform: translate(-50%,-50%);
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
  }

</style>
