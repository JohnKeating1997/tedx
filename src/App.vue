<template>
  <div id="app" ref="view">
    <div id="lang">
      <span @click="handleToggleToChinese" :class="this.lang === 'CN' ? 'selected' : 'unselected'">中</span>
      |
      <span @click="handleToggleToEnglish" :class="this.lang === 'EN' ? 'selected' : 'unselected'">EN</span>
    </div>
    <keep-alive include="Edit">
      <router-view/>
    </keep-alive>
  </div>
</template>
<!--
<script src="//cdn.bootcss.com/eruda/1.5.2/eruda.min.js"></script>
<script> window.eruda.init(); </script>
-->
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'App',
  mounted () {
    // 初始化中文
    this.toggleLanguage('CN')
  },
  methods: {
    ...mapActions(['toggleLanguage']),
    handleToggleToChinese () {
      console.log('handleToggleToChinese')
      this.toggleLanguage('CN')
    },
    handleToggleToEnglish () {
      this.toggleLanguage('EN')
    }
  },
  computed: {
    ...mapGetters(['lang'])
  }
}
</script>

<style lang="less" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  width:calc(min(100vmin*2,100vmax));
  height:calc(min(100vmin, 100vmax / 2));
  margin: 0 auto;
}
#lang {
  position: absolute;
  top: (21/16rem);
  left: (20/16rem);
  font-size: (14/16rem);
  z-index: 100;
  span.selected{
    color: #fff;
  }
  span.unselected{
    color: rgba(255,255,255,.35);
  }
}
</style>
