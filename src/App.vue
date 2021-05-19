<template>
  <div id="app">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Header from './components/Header.vue';

export default {
  name: 'app',
  components: {
    Header,
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}

html {
  overflow-x: hidden;
}

body {
  height: 100vh;
  margin: 0;
  font-family: @primary-font;
  color: #3f4249;
  background: #686b70;
  overflow-x: hidden;
}

a {
  color: inherit;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;

  &:active {
    color: inherit;
  }
}

li {
  list-style: none;
}
</style>
