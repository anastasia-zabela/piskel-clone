<template>
  <section class="tools">
    <Tool
      v-for="tool in tools"
      :key="tool.name"
      :iconTool="tool.icon"
      :nameTool="tool.name"
      :shortcut="tool.shortcut"
      :title="tool.name"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Tool from './Tool.vue';

export default defineComponent({
  name: 'Tools',
  components: {
    Tool,
  },
  computed: {
    tools() {
      return this.$store.state.tools;
    },
  },
});
</script>

<style lang="less" scoped>
.tools {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 10vh;
  margin: 5vh 0;

  &__button-tool {
    position: relative;
    height: 5vh;
    width: 5vh;
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
