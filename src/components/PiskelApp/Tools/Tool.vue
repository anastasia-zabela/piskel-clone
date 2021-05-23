<template>
  <button
    :class="[{ active: isActive }, 'tools__button-tool']"
    :title="title"
    v-on:click="chooseTool"
  >
    <font-awesome-icon size="2x" :icon="iconTool"></font-awesome-icon>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Tools } from '@/common/interfaces/tools';

export default defineComponent({
  name: 'Tool',
  data() {
    return {};
  },
  props: {
    nameTool: {
      type: String as PropType<Tools>,
      required: true,
    },
    iconTool: {
      type: [String, Array],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    shortcut: {
      type: String,
      required: true,
    },
  },
  computed: {
    isActive(): boolean {
      return this.$store.state.currentTool === this.nameTool;
    },
    currentTool(): string {
      return this.$store.state.currentTool;
    },
    tooltip(): string {
      return `${this.title} ${this.shortcut}`;
    },
  },
  methods: {
    chooseTool() {
      this.$store.state.currentTool = this.nameTool;
    },
  },
});
</script>
