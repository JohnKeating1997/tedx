<!--
 * @Author: your name
 * @Date: 2021-04-08 19:41:58
 * @LastEditTime: 2021-04-21 16:55:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tedx\src\views\submit\success.vue
-->
<template>
  <div id="view">
    <div id="rendering" v-if="canvasRendering">
      <img src="../../assets/images/loading.gif" alt="">
    </div>
    <div id="button-home" @click="$router.push({name: 'Index'})"></div>
    <div id="left-card">
      <div class="thanks-info" :style="{'width': thanksInfoAttributes.width, 'height' : thanksInfoAttributes.height, 'backgroundImage' : thanksInfoAttributes.backgroundImage}"></div>
    </div>
    <div id="right-card" ref="rightCard">
      <div class="user-input">
        <div class="user-title">#{{this.$route.params.userTitle}}</div>
        <div class="user-name-and-time">
          <span>{{this.$route.params.userName}}</span>
          <span class="split">|</span>
          <span>{{this.timeString}}</span>
        </div>
      </div>
      <img class="cover" src="../../assets/images/background-card.png" alt="">
      <div class="QRCode"></div>
      <!-- <img class="dialogue" src="../../assets/images/Dialogueinspace.svg">
      <img src="../../assets/images/Logo-black.svg" alt="" class="logo"> -->
    </div>
    <!-- <img v-if="savedRightCard" id="saved-right-card" :src="savedRightCard" alt=""> -->
    <div id="save-tips">
      <span>{{saveTips}}</span>
      <img src='../../assets/images/ic_arrow_right.svg'>
    </div>
    <!-- <div id="exception-tips" @click="handleException">
      <span>{{exceptionTips}}</span>
    </div> -->
    <div id="copywrite">
      <img src='../../assets/images/logo em.svg'>
      <span>{{copyright}}</span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import thanksInfoCN from '@/assets/images/thanks-info-CN.svg'
import thanksInfoEN from '@/assets/images/thanks-info-EN.svg'
import test from '@/assets/images/satellite.png'
// 长按保存图片的依赖包
// import {saveImg} from '@/utils/saveImage.js'
export default {
  name: 'Success',
  data () {
    return {
      // 文案svg
      thanksInfoCN,
      thanksInfoEN,
      test,
      savedRightCard: null,
      // canvas是否在渲染
      canvasRendering: false
    }
  },
  computed: {
    ...mapGetters(['lang']),
    // thanksInfo1 () {
    //   return this.lang === 'CN' ? '感谢您的参与，' : 'Thank you!'
    // },
    // thanksInfo2 () {
    //   return this.lang === 'CN' ? '请收下属于您的电磁波信号碎片' : 'Please accept the electromagnetic signal fragments we designed for you.'
    // },
    thanksInfoAttributes () {
      if (this.lang === 'CN') {
        return {
          width: '17.3125rem',
          height: '3.1875rem',
          backgroundImage: `url(${this.thanksInfoCN})`
        }
      }
      return {
        width: '19.8rem',
        height: '4.7rem',
        backgroundImage: `url(${this.thanksInfoEN})`
      }
    },
    saveTips () {
      return this.lang === 'CN' ? '截屏保存碎片 ' : 'Take screen shot to save fragment '
    },
    exceptionTips () {
      return this.lang === 'CN' ? '如碎片无法正常显示，点击这里并手动截图' : 'if the fragment doesn\'t display properly, tap here and take screenshots manually'
    },
    copyright () {
      return this.lang === 'CN' ? '本项目由不亦乐乎科技（杭州）提供技术支持.' : 'Powered by Hangzhou EnjoyMusic Technology.'
    },
    timeString () {
      const date = new Date()
      return `${date.getDate().toString()}.${(date.getMonth() + 1).toString()}.${date.getFullYear().toString()}`
    }
  },
  methods: {
    // async handleDownload () {
    //   // 保存url
    //   this.savedRightCard = await saveImg(this.$refs.rightCard)
    // },
    // handleException () {
    //   this.savedRightCard = null
    // }
  },
  mounted () {
    // saveImg(this.$refs.rightCard).then( (url) => {
    //   this.savedRightCard = url
    //   this.canvasRendering = false;
    // })
  }
}
</script>

<style lang="less" scoped>
  #view {
    width:calc(min(100vmin*2,100vmax));
    height:calc(min(100vmin, 100vmax / 2));
    background-image: url('../../assets/images/Grid2.svg');
    background-size: cover;
    z-index: 1;
    position: absolute;
    #rendering {
      width: (400/16rem);
      height: 100%;
      background: #000;
      position: absolute;
      top: 0;
      z-index: 10;
      img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
      }
    }
    #button-home {
      width: (36/16rem);
      height: (36/16rem);
      background-image: url('../../assets/images/Button-home.svg');
      background-size: cover;
      position: absolute;
      z-index: 10;
      top: (32/16rem);
      left: (72/16rem);
    }
    #left-card {
      width: (461/16rem);
      height: (300/16rem);
      background-image: url('../../assets/images/satellite.svg');
      background-size: cover;
      // background-position-x:30%;
      // background-repeat: no-repeat;
      position: absolute;
      left: (71/16rem);
      top: 0;
        .thanks-info {
          width: (330/16rem);
          height: (75/16rem);
          position: absolute;
          top: (205.64/16rem);
          left: 0;
          background-size: contain;
          background-position: top left;
        }
    }
    #right-card {
      width: (264/16rem);
      height: (334.14/16rem);
      background-image: url('../../assets/images/sawtooth.svg');
      background-size: cover;
      position: absolute;
      left: (418/16rem);
      top: (32/16rem);
      .cover {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        // padding: (16/16rem);
        z-index: 2;
        pointer-events:none;
      }
      .QRCode {
        width: (43/16rem);
        height: (43/16rem);
        background: #666;
        position: absolute;
        z-index: 3;
        left: (16/16rem);
        top:(263/16rem);
        background-image: url('../../assets/images/QRCode.png');
        background-size: contain;
      }
      .dialogue {
        width: (176.62/16rem);
        height: (13.68/16rem);
        position: absolute;
        top: (263.72/16rem);
        left: (64/16rem);
      }
      .logo {
        width: (74.29/16rem);
        height: (16/16rem);
        position: absolute;
        top: (289/16rem);
        left: (70/16rem);
      }
      .user-input {
        position : absolute;
        top:(32/16rem);
        left:(28/16rem);
        z-index: 3;
        .user-title {
          font-size: (14/16rem);
          font-weight: 700;
          width: 100%;
          text-align: left;
          margin-bottom: (6/16rem);
        }
        .user-name-and-time{
          font-size: (10/16rem);
          width: 100%;
          text-align: left;
          .split {
            padding: 0 (2.5/16rem);
          }
        }
      }
    }
    #saved-right-card {
      width: (264/16rem);
      height: (334.14/16rem);
      display: block;
      position: absolute;
      left: (418/16rem);
      top: (32/16rem);
      z-index: 10;
      border: none;
      object-fit: cover;
    }
    #save-tips {
      position: absolute;
      left: (71/16rem);
      top: (312/16rem);
      font-size: (14/16rem);
      width: (240/16rem);
      text-align: left;
      img {
        font-size: 0;
        width: (14/16rem);
        line-height: (14/16rem);
        position: relative;
        top:(1.5/16rem);
      }
    }
    // #exception-tips {
    //   position: absolute;
    //   left: (71/16rem);
    //   top: (340/16rem);
    //   font-size: (14/16rem);
    //   width: (300/16rem);
    //   text-align: left;
    //   height: (20/16rem);
    //   line-height: (20/16rem);
    // }
    #copywrite {
      position: absolute;
      left: (71/16rem);
      top: (341/16rem);
      font-size: (10/16rem);
      width: (300/16rem);
      text-align: left;
      img {
        font-size: 0;
        width: (24/16rem);
        line-height: (12/16rem);
        position: relative;
        top:(3.45/16rem);
      }
      span::before {
        content: '|';
        padding: (4/16rem);
      }
    }
  }
</style>
