<template>
  <section class="colors">
    <ColorPickerBlock
      :className="'primary-color'"
      :colorName="'primary'"
      :defaultColor="primaryColor"
    />
    <ColorPickerBlock
      :className="'secondary-color'"
      :colorName="'secondary'"
      :defaultColor="secondaryColor"
    />
    <font-awesome-icon icon="level-up-alt" class="colors__arrow"></font-awesome-icon>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ColorPickerBlock from './ColorPickerBlock.vue';

export default defineComponent({
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
});
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
