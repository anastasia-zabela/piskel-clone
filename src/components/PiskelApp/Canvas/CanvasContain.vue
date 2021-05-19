<template>
  <section class="canvas-contain">
    <CanvasForDraw v-bind:sizeCanvas="sizeCanvas" />
    <CanvasForView />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CanvasForDraw from './CanvasForDraw.vue';
import CanvasForView from './CanvasForView.vue';

export default defineComponent({
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
});
</script>

<style lang="less" scoped>
.canvas-contain {
  position: relative;
  margin: auto;
  width: 85vh;
  height: 85vh;
}
</style>
