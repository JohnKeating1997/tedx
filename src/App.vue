<template>
  <div id="app" ref="view">
    <router-view/>
  </div>
</template>
<!--
<script src="//cdn.bootcss.com/eruda/1.5.2/eruda.min.js"></script>
<script> window.eruda.init(); </script>
-->
<script>
export default {
  name: 'App',
  mounted () {
  },
  methods: {

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  width: 100vmax;
  height: 100vmin;
}
</style>
