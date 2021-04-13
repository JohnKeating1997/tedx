<!--
 * @Author: your name
 * @Date: 2021-04-08 19:41:58
 * @LastEditTime: 2021-04-13 17:00:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tedx\src\views\submit\success.vue
-->
<template>
  <div id="view">
    <div id="button-home"></div>
    <div id="left-card">
      <div class="thanks-info">
        <p>{{thanksInfo1}}</p>
        <p>{{thanksInfo2}}</p>
      </div>
      <div class="save-tips">
        <span>{{saveTips}}</span>
        <i></i>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'Success',
  data () {
    return {
      
    }
  },
  computed: {
    ...mapGetters(['lang']),
    thanksInfo1 () {
      return this.lang === 'CN' ? '感谢您的参与，' : 'Thank you!'
    },
    thanksInfo2 () {
      return this.lang === 'CN' ? '请收下属于您的电磁波信号碎片' : 'Please accept the electromagnetic signal fragments we designed for you.'
    },
    saveTips () {
      return this.lang === 'CN' ? '长按即可保存碎片' : 'Tap to save fragment'
    },
    copyright () {
      return this.lang === 'CN' ? '本项目由不亦乐乎科技（杭州）提供技术支持.' : 'thanks for your ...'
    }
  }
}
</script>

<style lang="less" scoped>
  #view {
    width:100vmax;
    height: 100vmin;
    background-image: url('../../assets/images/Grid2.svg');
    background-size: cover;
    z-index: 1;
    position: absolute;
    #button-home {
      width: (36/16rem);
      height: (36/16rem);
      background-image: url('../../assets/images/Button-home.svg');
      background-size: cover;
      position: absolute;
      top: (32/16rem);
      left: (74/16rem);
    }
    #left-card {
      width: (540.66/16rem);
      height: (370.49/16rem);
      background-image: url('../../assets/images/satellite.svg');
      background-size: cover;
      // background-position-x:30%;
      // background-repeat: no-repeat;
      position: absolute;
      top: 0;
      // right: (165.05/16rem);
      left: (50/16rem);
        .thanks-info {
          width: (320.29/16rem);
          position: absolute;
          top: (229/16rem);
          left: (74/16rem);
          color: #fff;
          font-weight: 700;
          font-size:(18/16rem);
          line-height: (20/16rem);
          text-align: left;
          p {
            margin-bottom: (8/16rem);
          }
        }
      }
  }
</style>
