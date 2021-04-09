<template>
  <div id="view">
    <!-- <p id="mark">TEDxHangzhou</p> -->
    <video
      id="opening-video"
      autoplay="autoplay"
      object-fit="fill"
      x5-video-player-type="h5"
      x5-video-player-fullscreen="true"
    >
      <source src="@/assets/videos/opening.mp4" type="video/mp4">
      您的浏览器不支持HTML5
    </video>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      src: '@/assets/videos/opening.mp4'
    }
  }
}
</script>

<style lang="less" scoped>
  // #mark{
  //   font-size: 2em;
  //   color: #fff;
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform:translate(-50%,-50%);
  // }
  #view {
    width: 100vmax;
    height:100vmin;
  }

</style>
