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
      <Tool
        v-bind:iconTool="tools.sameColor.icon"
        v-bind:nameTool="tools.sameColor.name"
        v-bind:shortcut="tools.sameColor.shortcut"
        v-bind:title="'Paint all pixels same color'" />
      <Tool
        v-bind:iconTool="tools.colorPicker.icon"
        v-bind:nameTool="tools.colorPicker.name"
        v-bind:shortcut="tools.colorPicker.shortcut"
        v-bind:title="'Color picker tool'" />
      <Tool
        v-bind:iconTool="tools.eraser.icon"
        v-bind:nameTool="tools.eraser.name"
        v-bind:shortcut="tools.eraser.shortcut"
        v-bind:title="'Eraser tool'" />
      <Tool
        v-bind:iconTool="tools.line.icon"
        v-bind:nameTool="tools.line.name"
        v-bind:shortcut="tools.line.shortcut"
        v-bind:title="'Line tool'" />
      <Tool
        v-bind:iconTool="tools.rectangle.icon"
        v-bind:nameTool="tools.rectangle.name"
        v-bind:shortcut="tools.rectangle.shortcut"
        v-bind:title="'Rectangle tool'" />
      <Tool
        v-bind:iconTool="tools.circle.icon"
        v-bind:nameTool="tools.circle.name"
        v-bind:shortcut="tools.circle.shortcut"
        v-bind:title="'Circle tool'" />
      <Tool
        v-bind:iconTool="tools.dithering.icon"
        v-bind:nameTool="tools.dithering.name"
        v-bind:shortcut="tools.dithering.shortcut"
        v-bind:title="'Dithering tool'" />
      <Tool
        v-bind:iconTool="tools.lighten.icon"
        v-bind:nameTool="tools.lighten.name"
        v-bind:shortcut="tools.lighten.shortcut"
        v-bind:title="'Lighten'" />
    </section>
</template>

<script>
import Tool from './Tool.vue';

export default {
  name: 'Tools',
  components: {
    Tool,
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
  display: flex;
  flex-direction: column;
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
    #hover-time-mixin();

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
