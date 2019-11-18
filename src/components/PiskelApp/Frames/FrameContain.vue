<template>
  <section class="frames-contain">
    <div class="frames-contain__wrapper">
      <div
        is="frame"
        v-for="frame in frames"
        v-bind:key="frame.keyId"
        v-bind:num="frame.num"
        v-bind:notAlone="moreThenOneFrame"
        v-on:selectFrame="selectFrame"
        v-on:copyFrame="copyFrame"
        v-on:deleteFrame="deleteFrame">
      </div>
      <button class="frames-contain__frame-add" title="Add new frame" @click="addNewFrame">
        <v-icon name="plus" scale="1.5" style=" margin-top: 2px; "></v-icon>
      </button>
    </div>
  </section>
</template>

<script>
import Frame from './Frame.vue';

export default {
  name: 'FrameContain',
  components: {
    Frame,
  },
  data() {
    return {
      frames: [
        {
          keyId: 0,
          num: 0,
          frame: Frame,
        },
      ],
      nextId: 1,
      nextNum: 1,
    };
  },
  computed: {
    moreThenOneFrame() {
      return this.frames.length > 1;
    },
  },
  methods: {
    addNewFrame() {
      const { ctxView, canvas } = this.$store.state.canvas;
      ctxView.clearRect(0, 0, canvas.width, canvas.height);

      this.frames.push({
        keyId: this.nextId,
        num: this.nextNum,
        frame: Frame,
      });
      this.nextId += 1;
      this.nextNum += 1;
    },
    selectFrame(id) {
      const ctxCanvas = this.$store.state.canvas.ctxView;
      const { canvas } = this.$store.state.canvas;

      this.$store.state.frames.currentFrame = id;

      ctxCanvas.clearRect(0, 0, canvas.width, canvas.height);
      this.$store.state.frames.framesData[id].forEach((elem) => {
        if (elem !== null) {
          const color = elem[3];
          ctxCanvas.fillStyle = color;
          ctxCanvas.fillRect(elem[0], elem[1], elem[2], elem[2]);
        }
      });
    },
    copyFrame(id) {
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
    deleteFrame(id) {
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
};
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
    background: rgba(0,0,0,0);
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
