<template>
  <section class="colors">

    <ColorPickerBlock
      v-bind:className="'primary-color'"
      v-bind:colorName="'primary'"
      v-bind:defaultColor="primaryColor" />
    <ColorPickerBlock
      v-bind:className="'secondary-color'"
      v-bind:colorName="'secondary'"
      v-bind:defaultColor="secondaryColor" />
    <v-icon class="colors__arrow" v-bind:name="'level-up-alt'"></v-icon>
  </section>
</template>

<script>
import ColorPickerBlock from './ColorPickerBlock.vue';

export default {
  name: 'ColorPicker',
  components: {
    ColorPickerBlock,
  },
  computed: {
    primaryColor() {
      return this.$store.state.colors.primary;
    },
    secondaryColor() {
      return this.$store.state.colors.secondary;
    },
  },
};
</script>

<style lang="less">
  .colors {
    display: grid;
    grid-template: 1fr 1fr 1fr e('/') 1fr 1fr 1fr;
    width: 8vh;
    height: 8vh;
    margin: auto;

    &__arrow {
      grid-area: 1 e('/') 3 e('/') 2 e('/') 4;
      margin: auto;

      &:hover {
        cursor: pointer;
        color: lighten(@font-color-dark, 40%);
      }
    }

    & svg {
      transform: rotate(-90deg);
    }
  }
</style>
