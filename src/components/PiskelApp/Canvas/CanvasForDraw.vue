<template>
  <canvas class="canvas-contain__secondary-canvas" width="800px" height="800px"></canvas>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CanvasForDraw',
  props: {
    sizeCanvas: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ctx(): CanvasRenderingContext2D {
      return this.$el.getContext('2d');
    },
    canvasWidth(): number {
      return this.$el.clientWidth;
    },
    sizeRect(): number {
      return this.canvasWidth / this.sizeCanvas;
    },
  },
  mounted() {
    this.$el.width = this.canvasWidth;
    this.$el.height = this.canvasWidth;
    this.$store.state.canvas.canvasWidth = this.canvasWidth;

    this.$store.state.canvas.ctxDraw = this.ctx;
    this.$store.state.canvas.sizeRect = this.sizeRect;
    console.log('canvas', this.canvasWidth, 'rect', this.sizeRect);
  },
});
</script>

<style lang="less" scoped>
.canvas-contain__secondary-canvas {
  z-index: 3;
  position: absolute;
  top: 0;
  left: 0;
  width: 85vh;
  width: 85vh;
}
</style>
