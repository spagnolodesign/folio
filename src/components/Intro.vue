<template><div class="intro-canvas"></div></template>

<script>

import threeEntryPoint from "@/threejs/threeEntryPoint"

export default {
  name: 'intro',
  mounted () {
    console.log('starting to mount');
    threeEntryPoint(this.$el)

  },
  methods: {
    mouseOver() {
      this.$store.commit('toggle')
    }
  }
}
</script>

<style>
	body { margin: 0; }
  canvas { width: 100%; height: 100%;}
  .intro-canvas {
      height: 100vh;
      width: 100%;
  }
</style>