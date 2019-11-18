<template>
  <canvas class="preview-contain__canvas"></canvas>
</template>

<script>
export default {
  name: 'PreviewCanvas',
  props: {
    fps: Number,
    // createAnimation: Function,
  },
  data() {
    return {
      indexFrame: 0,
      showAnimation: false,
    };
  },
  computed: {
    frames() {
      return document.getElementsByClassName('frames-contain__wrapper-frame');
    },
    ms() {
      return Math.floor(1000 / this.fps);
    },
  },
  watch: {
    ms() {
      if (this.ms !== Infinity && this.showAnimation === false) {
        this.createPreviewAnimation();
      }
    },
  },
  methods: {
    createPreviewAnimation() {
      const { ctxPreview } = this.$store.state.preview;
      const preview = this.$el;

      this.showAnimation = true;

      ctxPreview.clearRect(0, 0, preview.width, preview.height);
      ctxPreview.imageSmoothingEnabled = false;
      if (this.frames[this.indexFrame] !== undefined) {
        ctxPreview.drawImage(this.frames[this.indexFrame].children[0], 0, 0,
          preview.width, preview.height);
      }
      this.indexFrame = this.indexFrame + 1;
      if (this.indexFrame === this.frames.length) {
        this.indexFrame = 0;
      }

      if (this.ms !== Infinity) {
        setTimeout(this.createPreviewAnimation, this.ms);
      } else {
        this.showAnimation = false;
      }
    },
    //   async createPreviewAnimation(ms) {
    //     console.log(this.frames);
    //     const { fps } = this;
    //     const { ctxPreview, currentFps } = this.$store.state.preview;
    //     const { canvas } = this.$store.state.canvas;
    //     const preview = this.$el;
    //     // const  = document.querySelector('.preview-contain__fps-block--fps-slider');
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
    //       // console.log(currentFps, fps, ms);
    //       if (frames.length === newFrames.length && fps === currentFps) {
    //         setTimeout(animationFrames, ms);
    //       }
    //     }

  //     await animationFrames();
  //   },
  },
  mounted() {
    this.$el.width = this.$el.clientWidth;
    this.$el.height = this.$el.clientWidth;
    this.$store.state.preview.ctxPreview = this.$el.getContext('2d');

    this.createPreviewAnimation();
  },
};
</script>

<style lang="less">
.preview-contain {
  &__canvas {
    width: 35vh;
    height: 35vh;
    background: url('../../../assets/background-canvas.jpg');
    image-rendering: pixelated;
  }

  &__canvas:-webkit-fullscreen {
    height: 100%;
    width: auto;
    image-rendering: pixelated;
  }
}
</style>
