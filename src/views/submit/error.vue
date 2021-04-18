<!--
 * @Author: your name
 * @Date: 2021-04-08 19:42:09
 * @LastEditTime: 2021-04-16 17:00:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tedx\src\views\submit\error.vue
-->
<template>
  <div id="view">
    <img src="../../assets/images/ERROR(x_x).svg" alt="" class="error">
    <p class="error-info">
      <span class="error-info1">{{errorInfo1}}</span>
      <a class="error-info2" @click="handleRetry">{{errorInfo2}}</a>
    </p>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['lang']),
    errorInfo1 () {
      return this.lang === 'CN' ? '出错啦！' : 'Error!'
    },
    errorInfo2 () {
      return this.lang === 'CN' ? '点我重试' : 'Tap to retry'
    }
  },
  methods: {
    handleRetry () {
      console.log('retry')
      // const test = document.getElementById('view')
      // debugger
      // alert(window.getComputedStyle(test, null).width)
      // alert(window.getComputedStyle(test, null).height)
      this.$route.params.retry()
    }
  }
}
</script>

<style lang="less" scoped>
  #view {
    width:calc(min(100vmin*2,100vmax));
    height:calc(min(100vmin, 100vmax / 2));
    background-image: url('../../assets/images/Text-background.svg');
    background-size: cover;
    z-index: 1;
    position: absolute;
    .error {
      width: (258/16rem);
      height: (40/16rem);
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    .error-info {
      font-size: (20/16rem);
      font-weight: 700;
      display: block;
      position: absolute;
      top: (280/16rem);
      // bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      .error-info2 {
        border-bottom: 1px solid #fff;
      }
    }
  }
</style>
