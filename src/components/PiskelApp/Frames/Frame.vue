<template>
  <div
    v-bind:class="['frames-contain__wrapper-frame', { selected: isSelect }]"
    @mouseenter="showFrameTools"
    @mouseleave="hideFrameTools"
  >
    <canvas class="frames-contain__frame" @click="$emit('selectFrame', num)"></canvas>
    <button class="frames-contain__number">{{ num + 1 }}</button>
    <button
      v-bind:class="['frames-contain__tool--delete-tool', { 'visible-tools': hoverOn && notAlone }]"
      @click="$emit('deleteFrame', num)"
    >
      <font-awesome-icon icon="trash"></font-awesome-icon>
    </button>
    <button
      v-bind:class="['frames-contain__tool--move-tool', { 'visible-tools': hoverOn && notAlone }]"
    >
      <font-awesome-icon icon="arrows-alt"></font-awesome-icon>
    </button>
    <button
      v-bind:class="['frames-contain__tool--copy-tool', { 'visible-tools': hoverOn }]"
      @click="$emit('copyFrame', num)"
    >
      <font-awesome-icon icon="clone"></font-awesome-icon>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Frame',
  props: {
    num: {
      type: Number,
      required: true,
    },
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
    isSelect(): boolean {
      return this.$props.num === this.$store.state.frames.currentFrameNum;
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
    const frameCanvasEl = this.$el.children[0];
    frameCanvasEl.width = this.$el.clientWidth;
    frameCanvasEl.height = this.$el.clientWidth;
    this.$store.state.frames.frameWidth = this.$el.clientWidth;

    const {
      canvas: { canvas },
      frames: { ctxFrame },
    } = this.$store.state;

    if (!this.$store.state.frames.framesData[this.num]) {
      this.$store.state.frames.framesData.push(
        new Array(this.$store.state.canvas.sizeCanvas ** 2).fill(null),
      );
    }

    this.$store.state.frames.currentFrameNum = this.num;
    this.$store.state.frames.ctxFrame = frameCanvasEl.getContext('2d');

    if (canvas && ctxFrame) {
      ctxFrame.drawImage(canvas, 0, 0, this.$el.clientWidth, this.$el.clientWidth);
    }
  },
});
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
