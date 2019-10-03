<template>
  <canvas class="canvas-contain__secondary-canvas" width="800px" height="800px"></canvas>
</template>

<script>
import addPenTool from '../Tools/pen';

export default {
  name: 'CanvasForDraw',
  props: {
    sizeCanvas: Number,
  },
  computed: {
    ctx() {
      return this.$el.getContext('2d');
    },
    sizeRect() {
      return Math.floor(800 / this.sizeCanvas);
    },
  },
  mounted() {
    this.$store.state.canvas.canvas = this.$el;
    this.$store.state.canvas.ctx = this.ctx;
    this.$store.state.canvas.sizeRect = this.sizeRect;

    addPenTool(this);
  },
};
</script>

<style lang="less" scoped>
.canvas-contain__secondary-canvas {
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
