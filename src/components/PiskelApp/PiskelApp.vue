<template>
  <section class="piskel-app">
    <Tools />
    <Frames />
    <Canvas />
  </section>
</template>

<script>
import Tools from './Tools/Tools.vue';
import Frames from './Frames/FrameContain.vue';
import Canvas from './Canvas/CanvasContain.vue';

export default {
  name: 'PiskelApp',
  components: {
    Tools,
    Frames,
    Canvas,
  },
};
</script>

<style scoped lang="less">
.piskel-app {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 100vh - 5vh;
}
</style>
