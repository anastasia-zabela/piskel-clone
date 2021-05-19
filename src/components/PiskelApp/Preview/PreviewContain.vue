<template>
  <section class="preview-contain">
    <div class="preview-contain__wrapper">
      <PreviewCanvas v-bind:fps="fps" />
      <FpsBlock />
      <button class="preview-contain__fullscreen">Fullscreen</button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PreviewCanvas from './PreviewCanvas.vue';
import FpsBlock from './PreviewFpsBlock.vue';

export default defineComponent({
  name: 'Preview',
  components: {
    PreviewCanvas,
    FpsBlock,
  },
  computed: {
    fps() {
      return this.$store.state.preview.currentFps;
    },
  },
  // methods: {
  //   async createPreviewAnimation(ms) {
  //     const { fps } = this;
  //     const { ctxPreview, currentFps } = this.$store.state.preview;
  //     const { canvas } = this.$store.state.canvas;
  //     const preview = this.$el;
  //     console.log(preview);
  //     let frames = document.getElementsByClassName('frames-contain__wrapper-frame');
  //     frames = Array.prototype.slice.call(frames);
  //     let indexFrame = 0;

  //     const frameOfAnimation = new Promise((resolve) => {
  //       let res;
  //       if (+fps !== 0) {
  //         res = true;
  //       } else if (+fps === 0 || frames.length < 2) {
  //         res = false;
  //       }
  //       resolve(res);
  //     });

  //     function animationFrames() {
  //       frameOfAnimation
  //         .then((fulfilled) => {
  //           if (fulfilled) {
  //             ctxPreview.clearRect(0, 0, preview.width, preview.height);
  //             ctxPreview.imageSmoothingEnabled = false;
  //             ctxPreview.drawImage(frames[indexFrame].children[0], 0, 0,
  //               preview.width, preview.height);
  //             indexFrame += 1;
  //             if (indexFrame === frames.length) {
  //               indexFrame = 0;
  //             }
  //           } else if (!fulfilled) {
  //             ctxPreview.clearRect(0, 0, preview.width, preview.height);
  //             ctxPreview.drawImage(canvas, 0, 0, preview.width, preview.height);
  //           }
  //         });
  //       const newFrames = document.getElementsByClassName('frames-contain__wrapper-frame');
  //       if (frames.length === newFrames.length && fps === currentFps) {
  //         setTimeout(animationFrames, ms);
  //       }
  //     }

  //     await animationFrames();
  //   },
  // },
});
</script>

<style lang="less">
.preview-contain {
  display: flex;
  justify-content: center;
  width: 44vh;

  &__fullscreen {
    width: 10vh;
    height: 3vh;
    margin: 10px auto;
    font-size: 1.5vh;
    font-weight: bold;
    background: @color-2;
    border: 2px solid @font-color-dark;
    color: @font-color-dark;

    &:hover {
      background: @color-3;
    }
  }
}
</style>
