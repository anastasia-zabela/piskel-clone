<template>
  <section class="piskel-app">
    <Tools />
    <Canvas />
  </section>
</template>

<script>
import Tools from './Tools/Tools.vue';
import Canvas from './Canvas/CanvasContain.vue';

export default {
  name: 'PiskelApp',
  components: {
    Tools,
    Canvas,
  },
};
</script>

<style scoped lang="less">

</style>
