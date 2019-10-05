<template>
  <div class="frames-contain__wrapper-frame selected"
    data-num-frame="0"
    @mouseenter="showFrameTools"
    @mouseleave="hideFrameTools">
    <canvas class="frames-contain__frame" width="150px" height="150px"></canvas>
    <button class="frames-contain__number">1</button>
    <button
      v-bind:class="['frames-contain__tool--delete-tool', {'visible-tools': hoverOn}]">
      <v-icon name="trash"></v-icon>
    </button>
    <button
      v-bind:class="['frames-contain__tool--move-tool', {'visible-tools': hoverOn}]">
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
  data() {
    return {
      hoverOn: false,
    };
  },
  methods: {
    showFrameTools() {
      this.hoverOn = true;
    },
    hideFrameTools() {
      this.hoverOn = false;
    },
  },
};
</script>

<style lang="less" scoped>
.frames-contain {
  &__wrapper-frame {
    position: relative;
    width: 150px;
    height: 150px;
    margin-bottom: 25px;
  }

  &__frame {
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
      top: 0;
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

    &--delete-tool:hover {
      #hover-tool-mixin();
    }

    &--move-tool:hover {
      #hover-tool-mixin();
    }

    &--copy-tool:hover {
      #hover-tool-mixin();
    }
  }
}

.visible-tools {
  display: inline-block;
}

</style>
