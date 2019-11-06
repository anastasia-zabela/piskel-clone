<template>
  <canvas class="canvas-contain__drawing-canvas"></canvas>
</template>

<script>
import addPenTool from '../Tools/pen';

export default {
  name: 'CanvasForView',
  computed: {
    ctx() {
      return this.$el.getContext('2d');
    },
  },
  mounted() {
    this.$el.width = this.$store.state.canvas.canvasWidth;
    this.$el.height = this.$store.state.canvas.canvasWidth;

    this.$store.state.canvas.canvas = this.$el;
    this.$store.state.canvas.ctxView = this.ctx;

    addPenTool(this);
  },
};
</script>

<style lang="less" scoped>
.canvas-contain__drawing-canvas {
  z-index: 5;
  position: absolute;
  top: 0;
  left: 0;
  width: 85vh;
  width: 85vh;
  background: url('../../../assets/background-canvas.jpg');
}
</style>
