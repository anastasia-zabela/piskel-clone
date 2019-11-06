<template>
  <div v-bind:class="['frames-contain__wrapper-frame', { selected: isSelect }]"
    @mouseenter="showFrameTools"
    @mouseleave="hideFrameTools"
    >
    <canvas class="frames-contain__frame"
      @click="$emit('selectFrame', num)"></canvas>
    <button class="frames-contain__number">{{ num + 1 }}</button>
    <button
      v-bind:class="['frames-contain__tool--delete-tool', {'visible-tools': hoverOn && notAlone}]"
      @click="$emit('deleteFrame', num)">
      <v-icon name="trash"></v-icon>
    </button>
    <button
      v-bind:class="['frames-contain__tool--move-tool', {'visible-tools': hoverOn && notAlone}]">
      <v-icon name="arrows-alt"></v-icon>
    </button>
    <button
      v-bind:class="['frames-contain__tool--copy-tool', {'visible-tools': hoverOn}]">
      <v-icon name="clone"></v-icon>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Frame',
  props: {
    num: Number,
    notAlone: Boolean,
    deleteFrame: Function,
    copyFrame: Function,
    selectFrame: Function,
  },
  data() {
    return {
      hoverOn: false,
    };
  },
  computed: {
    isSelect() {
      return this.num === this.$store.state.frames.currentFrame;
    },
  },
  watch: {
    isSelect() {
      if (this.isSelect) {
        this.$store.state.frames.ctxFrame = this.$el.children[0].getContext('2d');
      }
    },
  },
  methods: {
    showFrameTools() {
      this.hoverOn = true;
    },
    hideFrameTools() {
      this.hoverOn = false;
    },
  },
  mounted() {
    const frameCanvas = this.$el.children[0];
    frameCanvas.width = this.$el.clientWidth;
    frameCanvas.height = this.$el.clientWidth;
    this.$store.state.frames.frameWidth = this.$el.clientWidth;

    const { canvas, ctxView } = this.$store.state.canvas;
    if (ctxView) {
      ctxView.clearRect(0, 0, canvas.width, canvas.height);
    }

    if (!this.$store.state.frames.framesData[this.num]) {
      this.$store.state.frames.framesData.push(new Array(this.$store.state.canvas.sizeCanvas ** 2)
        .fill(null));
    }

    this.$store.state.frames.currentFrame = this.num;
    this.$store.state.frames.ctxFrame = frameCanvas.getContext('2d');
  },
};
</script>

<style lang="less" scoped>
.frames-contain {
  &__wrapper-frame {
    position: relative;
    width: 15vh;
    height: 15vh;
    margin-bottom: 25px;
    border: 4px solid transparent;
  }

  &__frame {
    width: 100%;
    height: 100%;
    background: url('../../../assets/background-canvas.jpg');
  }

  &__number {
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
    background: @color-2;
    color: @font-color-light;
    border: none;
  }

  &__tool {
    &--delete-tool {
      #frame-tools-mixin();
      #hover-time-mixin();
      right: 0;
    }

    &--move-tool {
      #frame-tools-mixin();
      #hover-time-mixin();
      bottom: 0;
      left: 0;
    }

    &--copy-tool {
      #frame-tools-mixin();
      #hover-time-mixin();
      bottom: 0;
      right: 0;
    }
  }
}

.visible-tools {
  display: inline-block;
}

</style>
