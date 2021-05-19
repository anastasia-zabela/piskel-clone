<template>
  <div class="header">
    <h1>Piskel clone</h1>
    <nav class="header__navigation-auth">
      <ul>
        <li v-for="route in routesList" :key="route.path">
          <router-link class="router-link" :to="route.path">{{ route.title }}</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { routes } from '../main';

export default defineComponent({
  name: 'Header',
  data() {
    return {
      routesList: routes,
    };
  },
});
</script>

<style scoped lang="less">
.header {
  display: grid;
  grid-template: 1fr e('/') 1fr 2fr 1fr;
  height: 5vh;
  background: @font-color-dark;

  @media screen and (max-width: 480px) {
    height: 10vh;
  }

  & h1 {
    margin: 0 20px;
    height: 100%;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    color: @font-color-light;
    font-size: 2vh;
  }

  & ul {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: auto;
    height: 100%;
    width: 250px;
  }

  & .router-link {
    color: @font-color-light;

    &:hover {
      color: @color-2;
    }
  }
  & .router-link-active {
    color: @color-1;

    &:hover {
      color: @color-1;
    }
  }
}
</style>
