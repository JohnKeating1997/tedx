<template>
  <div id="view">
    <img id="background-gif" src="@/assets/videos/background.gif" alt="请耐心等待">
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
  #view{
    width:100vmax;
    height:100vmin;
    #background-gif{
      height:100%;
    }
  }
</style>
