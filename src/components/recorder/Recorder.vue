<template>
  <p>recorder</p>
</template>

<script>
import Recorder from 'js-audio-recorder'
export default {
  created() {
    this.recorder = new Recorder()
  }
}
</script>

<style lang="less" scoped>

</style>