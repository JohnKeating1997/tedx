<!--
 * @Author: your name
 * @Date: 2021-04-09 16:47:01
 * @LastEditTime: 2021-04-19 16:43:23
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
        this.$router.push({name: 'Index'})
      }, 10000)
    }
  }
}
</script>

<style lang="less" scoped>
  #view{
    width:calc(min(100vmin*2,100vmax));
    height:calc(min(100vmin, 100vmax / 2));
    #opening-gif{
      width:calc(min(100vmin*2,100vmax));
      height:calc(min(100vmin, 100vmax / 2));
    }
  }
</style>
