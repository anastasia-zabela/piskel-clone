<template>
  <section class="tools">
      <Tool
        v-bind:iconTool="tools.pen.icon"
        v-bind:nameTool="tools.pen.name"
        v-bind:shortcut="tools.pen.shortcut"
        v-bind:title="'Pen tool'"  />
      <Tool
        v-bind:iconTool="tools.paintBucket.icon"
        v-bind:nameTool="tools.paintBucket.name"
        v-bind:shortcut="tools.paintBucket.shortcut"
        v-bind:title="'Paint bucket tool'" />
      <!-- <button class="tools__paint-bucket-tool">
        <v-icon name="fill-drip"></v-icon>
        <div> (B)</div>
      </button>
      <button class="tools__paint-same-color-tool">
        <v-icon name="palette"></v-icon>
        <div>Paint all pixel same color (A)</div>
      </button>
      <button class="tools__color-picker-tool">
        <v-icon name="eye-dropper"></v-icon>
        <div>Color picker tool (O)</div>
      </button>
      <button class="tools__eraser-tool">
        <v-icon name="eraser"></v-icon>
        <div>Eraser tool (E)</div>
      </button>
      <button class="tools__line-tool">
        <v-icon name="slash"></v-icon>
        <div>Line tool (L)</div>
      </button>
      <button class="tools__rectangle-tool">
        <v-icon name="vector-square"></v-icon>
        <div>Rectangle tool (R)</div>
      </button>
      <button class="tools__circle-tool">
        <v-icon name="circle"></v-icon>
        <div>Circle tool (C)</div>
      </button>
      <button class="tools__dithering-tool">
        <v-icon name="brands/delicious"></v-icon>
        <div>Dithering tool (T)</div>
      </button>
      <button class="tools__lighten-tool">
        <v-icon name="adjust"></v-icon>
        <div>Lighten (U)</div>
      </button>
      <button class="tools__move-tool" title="Move tool (M)">
        <v-icon name="hand-paper"></v-icon>
        <div>Move tool (M)</div>
      </button>
      <button class="tools__shape-selection-tool">
        <v-icon name="magic"></v-icon>
        <div>Shape selection (S)</div>
      </button> -->
    </section>
</template>

<script>
import Tool from './Tool.vue';

export default {
  name: 'Tools',
  components: {
    Tool,
  },
  data() {
    return {

    };
  },
  computed: {
    tools() {
      return this.$store.state.tools;
    },
  },
};
</script>

<style lang="less" scoped>
.tools {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100px;
  margin: auto 0;

  &__button-tool {
    position: relative;
    height: 50px;
    width: 50px;
    font-size: 25px;
    border: 1px solid @bg-color;
    background: @color-3;
    color: @font-color-dark;
    outline: none;

    &:hover {
      cursor: pointer;
      background: @color-2;
    }
  }

  & .active {
    background: @color-1;
  }
}
</style>
