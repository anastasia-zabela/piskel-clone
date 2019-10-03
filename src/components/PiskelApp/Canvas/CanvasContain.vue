<template>
  <section class="canvas-contain">
    <CanvasForDraw v-bind:sizeCanvas="sizeCanvas" />
    <CanvasForView />
  </section>
</template>

<script>
import CanvasForDraw from './CanvasForDraw.vue';
import CanvasForView from './CanvasForView.vue';

export default {
  name: 'CanvasContain',
  components: {
    CanvasForDraw,
    CanvasForView,
  },
  data() {
    return {
      sizeCanvas: 32,
    };
  },
};
</script>

<style lang="less" scoped>
.canvas-contain {
  position: relative;
  margin: auto;
  width: 800px;
  height: 800px;
}
</style>
