<template>
  <article class="landing-page__piskel-app">
    <div>
      <h2>This is a free online editor for animated sprites & pixel art</h2>
      <p>Go to create an animated sprite</p>
      <button class="landing-page__piskel-app--create-sprite">
        <router-link to="/piskel-app">Create sprite</router-link>
      </button>
    </div>
    <img src="../../assets/screenshot.jpg" />
  </article>
</template>

<script>
export default {
  name: 'AboutApp',
};
</script>

<style lang="less" scoped>
.landing-page__piskel-app {
  display: grid;
  grid-template: 1fr e('/') 1fr 1.5fr;
  height: 600px;
  background: @color-1;

  & div {
    width: 400px;
    height: 300px;
    margin: auto;

    @media screen and (max-width: 480px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100vw;
    }
  }

  & h2 {
    margin-bottom: 20px;
    font-size: 25px;

    @media screen and (max-width: 480px) {
      text-align: center;
    }
  }

  & p {
    font-size: 20px;
  }

  & button {
    width: 150px;
    height: 50px;
    margin-top: 30px;
    font-size: 20px;
    color: @font-color-dark;
    background: @color-2;
    border: 3px solid @bg-color;
    outline: none;

    &:hover {
      cursor: pointer;
      background: @color-3;
    }
  }

  & img {
    width: 900px;
    margin: auto;

    @media screen and (max-width: 480px) {
      display: none;
    }
  }
}
</style>
