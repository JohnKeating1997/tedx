<!--
 * @Author: your name
 * @Date: 2021-04-09 16:47:01
 * @LastEditTime: 2021-04-11 09:39:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tedx\src\views\index\opening.vue
-->
<template>
  <div id="view">
    <!-- <video
      id="opening-video"
      autoplay
      object-fit="fill"
      @ended="handleEnded"
      muted
    >
      <source src="@/assets/videos/opening.mp4" type="video/mp4">
      您的浏览器不支持HTML5
    </video> -->
    <img id="opening-gif" src="@/assets/videos/opening.gif" alt="请耐心等待" @load="handleImageOnload">
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
    }
  },
  methods: {
    handleImageOnload () {
      // gif动画播放完才触发
      setTimeout(() => {
        this.$router.push({path: '/index'})
      }, 13000)
    }
  }
}
</script>

<style lang="less" scoped>
  #view{
    width:100vmax;
    height:100vmin;
    #opening-gif{
      height:100%;
    }
  }
</style>
