<template>
  <button
    v-bind:class="[{ active: isActive }, 'tools__button-tool']"
    v-bind:title="title"
    v-on:click="chooseTool"
  >
    <font-awesome-icon :size="'2x'" :icon="iconTool"></font-awesome-icon>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Tool',
  data() {
    return {};
  },
  props: {
    nameTool: {
      type: String,
      required: true,
    },
    iconTool: String,
    title: String,
    shortcut: String,
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
