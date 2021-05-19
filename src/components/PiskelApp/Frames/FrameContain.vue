<template>
  <section class="frames-contain">
    <div class="frames-contain__wrapper">
      <div
        v-for="frame in frames"
        v-bind:key="frame.keyId"
        v-bind:num="frame.num"
        v-bind:notAlone="moreThenOneFrame"
        v-on:selectFrame="selectFrame"
        v-on:copyFrame="copyFrame"
        v-on:deleteFrame="deleteFrame"
      ></div>
      <button class="frames-contain__frame-add" title="Add new frame" @click="addNewFrame">
        <v-icon name="plus" scale="1.5" style="margin-top: 2px"></v-icon>
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Frame from './Frame.vue';

export default defineComponent({
  name: 'FrameContain',
  // components: {
  //   Frame,
  // },
  data() {
    return {
      frames: [
        {
          keyId: 0,
          num: 0,
          // frame: Frame,
        },
      ] as {
        keyId: number;
        num: number;
        frame: unknown;
      }[],
      nextId: 1,
      nextNum: 1,
    };
  },
  computed: {
    // moreThenOneFrame() {
    //   return this.frames.length > 1;
    // },
  },
  methods: {
    addNewFrame() {
      const { ctxView, canvasWidth } = this.$store.state.canvas;
      ctxView?.clearRect(0, 0, canvasWidth, canvasWidth);

      this.frames.push({
        keyId: this.nextId,
        num: this.nextNum,
        frame: Frame,
      });
      this.nextId += 1;
      this.nextNum += 1;
    },
    selectFrame(id: number) {
      const ctxCanvas = this.$store.state.canvas.ctxView;
      const { canvasWidth } = this.$store.state.canvas;
      if (!ctxCanvas) return;

      this.$store.state.frames.currentFrame = id;

      ctxCanvas?.clearRect(0, 0, canvasWidth, canvasWidth);
      this.$store.state.frames.framesData[id].forEach((elem) => {
        if (elem !== null && typeof elem !== 'number') {
          const color = elem[3];
          ctxCanvas.fillStyle = String(color) || '';
          ctxCanvas.fillRect(Number(elem[0]), Number(elem[1]), Number(elem[2]), Number(elem[2]));
        }
      });
    },
    copyFrame(id: number) {
      this.frames.splice(id + 1, 0, {
        keyId: this.nextId,
        num: id,
        frame: Frame,
      });
      this.nextId += 1;
      this.nextNum += 1;

      this.frames.forEach((item, i) => {
        const frame = item;
        frame.num = i;
      });

      const copyFrameData = this.$store.state.frames.framesData.slice(id, id + 1);
      this.$store.state.frames.framesData.splice(id + 1, 0, copyFrameData[0]);

      this.selectFrame(this.$store.state.frames.currentFrame + 1);
    },
    deleteFrame(id: number) {
      this.frames.splice(id, 1);
      this.$store.state.frames.framesData.splice(id, 1);

      this.frames.forEach((item, i) => {
        const frame = item;
        frame.num = i;
      });
      this.nextNum = this.frames.length;

      if (this.$store.state.frames.currentFrame === this.frames.length) {
        this.$store.state.frames.currentFrame = this.frames.length - 1;
      }

      this.selectFrame(this.$store.state.frames.currentFrame);
    },
  },
});
</script>

<style lang="less" scoped>
.frames-contain {
  position: relative;
  display: flex;
  justify-content: center;
  height: 85vh;

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20vh;
    overflow-y: scroll;
    border-left: 2px solid #ccdee2;
  }

  &__wrapper::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
    border-left: 2px solid @color-1;
  }

  &__wrapper::-webkit-scrollbar {
    width: 10px;
  }

  &__wrapper::-webkit-scrollbar-thumb {
    background-color: @font-color-dark;
    border-radius: 20px;
  }

  &__frame-add {
    width: 5vh;
    min-height: 5vh;
    margin-bottom: 20px;
    color: @font-color-dark;
    background: @color-1;
    border: 2px solid @font-color-dark;
    border-radius: 100%;
    outline: none;
    #hover-time-mixin();

    &:hover {
      cursor: pointer;
      background: @font-color-light;
    }
  }
}

.selected {
  border: 4px solid @color-2;
}

.over {
  border: 4px dotted @color-2;
}
</style>
