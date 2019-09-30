<template>
  <div class="header">
    <h1>Piskel clone</h1>
    <nav class="header__navigation-auth">
      <ul>
        <li>
          <router-link to='/'>Home</router-link>
        </li>
        <li>
          <router-link to='/piskel-app'>Create sprite</router-link>
        </li>
      </ul>
    </nav>

  </div>
</template>

<script>
export default {
  name: 'Header',
};
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

    & a {
      color: @font-color-light;

      &:hover {
        color: @color-2;
      }
    }
  }
}
</style>
