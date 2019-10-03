<template>
  <canvas class="canvas-contain__drawing-canvas" width="800px" height="800px"></canvas>
</template>

<script>
export default {
  name: 'CanvasForView',
  computed: {
    ctx() {
      return this.$el.getContext('2d');
    },
  },
  mounted() {
    this.$store.state.canvas.ctxView = this.ctx;
  },
};
</script>

<style lang="less" scoped>
.canvas-contain__drawing-canvas {
  z-index: 5;
  position: absolute;
  top: 0;
  left: 0;
  background: url('../../../assets/background-canvas.jpg');
}
</style>
