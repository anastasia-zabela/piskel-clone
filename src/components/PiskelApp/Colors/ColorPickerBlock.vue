<template>
  <div v-bind:class="[className]">
    <div
      class="colors__item"
      @click="showColorPicker"
      v-bind:style="{ background: [currentColor] }"
    ></div>
    <ColorPicker v-if="showPicker" v-bind:color="currentColor" v-bind:colorName="colorName" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ColorPicker from './ColorPicker.vue';

export default defineComponent({
  name: 'ColorPickerBlock',
  components: {
    ColorPicker,
  },
  props: {
    className: String,
    colorName: {
      type: String as PropType<'primary' | 'secondary'>,
      required: true,
    },
    defaultColor: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showPicker: false,
    };
  },
  computed: {
    currentColor(): string {
      return this.$store.state.colors[this.colorName];
    },
  },
  methods: {
    showColorPicker() {
      this.showPicker = !this.showPicker;
    },
  },
  mounted() {
    this.$store.state.colors[this.colorName] = this.defaultColor;
  },
});
</script>

<style lang="less">
.colors {
  &__item {
    height: 100%;
    border: 2px solid @font-color-dark;
    box-sizing: border-box;

    &:hover {
      cursor: pointer;
      border-color: lighten(@font-color-dark, 40%);
    }
  }
}

.primary-color {
  position: relative;
  z-index: 2;
  grid-area: 1 e('/') 1 e('/') 3 e('/') 3;
}

.secondary-color {
  position: relative;
  grid-area: 2 e('/') 2 e('/') 4 e('/') 4;
}
</style>
