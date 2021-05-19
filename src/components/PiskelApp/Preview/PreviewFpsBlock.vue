<template>
  <div class="preview-contain__fps-block">
    <span>FPS</span>
    <span class="fps-value">{{ fps }}</span>
    <input
      class="preview-contain__fps-block--fps-slider"
      type="range"
      min="0"
      max="24"
      step="1"
      v-model="fps"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FpsBlock',
  data() {
    return {
      fps: this.$store.state.preview.currentFps,
    };
  },
  watch: {
    fps() {
      this.$store.state.preview.currentFps = Number(this.fps);
    },
  },
});
</script>

<style lang="less">
&.preview-contain__fps-block {
  display: grid;
  grid-template-columns: 7vh 3vh 1fr;
  width: 35vh;
  height: 5vh;
  background: @color-1;

  & span {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2vh;
  }

  &--fps-slider {
    -webkit-appearance: none;
    width: 90%;
    margin: auto;
    cursor: pointer;
    outline: none;
    background: transparent;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 2vh;
      width: 2vh;
      margin-top: -0.5vh;
      background: @color-3;
      border: 2px solid @bg-color;
      border-radius: 100%;
    }

    &::-webkit-slider-runnable-track {
      width: 100%;
      height: 1vh;
      background: @bg-color;
      border-radius: 5px;
    }
  }
}
</style>
