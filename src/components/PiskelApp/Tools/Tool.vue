<template>
  <button
    v-bind:class="[{active: isActive}, 'tools__button-tool']"
    v-bind:title="tooltip"
    v-on:click="chooseTool">
    <v-icon scale="1.5" v-bind:name="iconTool"></v-icon>
  </button>
</template>

<script>
export default {
  name: 'Tool',
  data() {
    return {

    };
  },
  props: {
    nameTool: String,
    iconTool: String,
    title: String,
    shortcut: String,
  },
  computed: {
    isActive() {
      return this.$store.state.currentTool === this.nameTool;
    },
    currentTool() {
      return this.$store.state.currentTool;
    },
    tooltip() {
      return `${this.title} ${this.shortcut}`;
    },
  },
  methods: {
    chooseTool() {
      this.$store.state.currentTool = this.nameTool;
    },
  },
};
</script>
