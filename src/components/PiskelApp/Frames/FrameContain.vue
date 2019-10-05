<template>
  <section class="frames-contain">
    <div class="frames-contain__wrapper">
      <Frame />
      <button class="frames-contain__frame-add" title="Add new frame">
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
    width: 200px;
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
    width: 50px;
    min-height: 50px;
    margin-bottom: 20px;
    font-size: 20px;
    color: @font-color-dark;
    background: @color-1;
    border: 2px solid @font-color-dark;
    border-radius: 25px;
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
