<template>
  <section class="piskel-app">
    <div class="piskel-col">
      <Tools />
      <ColorPicker />
    </div>
    <Frames />
    <Canvas />
    <Preview />
  </section>
</template>

<script>
import Tools from './Tools/Tools.vue';
import Frames from './Frames/FrameContain.vue';
import Canvas from './Canvas/CanvasContain.vue';
import ColorPicker from './Colors/ColorPickerContain.vue';
import Preview from './Preview/PreviewContain.vue';

export default {
  name: 'PiskelApp',
  components: {
    Tools,
    Frames,
    Canvas,
    ColorPicker,
    Preview,
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

.piskel-col {
  height: inherit;
}
</style>
