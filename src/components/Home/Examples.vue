<template>
  <article class="landing-page__animation-example">
    <div class="animations">
      <h2>Example sprites</h2>
      <img src="../../assets/animation1.gif" />
      <img src="../../assets/animation2.gif" />
      <img src="../../assets/animation3.gif" />
      <img src="../../assets/animation4.gif" />
    </div>
  </article>
</template>

<script>
export default {
  name: 'Examples',
};
</script>

<style lang="less" scoped>
.landing-page__animation-example {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  text-transform: uppercase;
  background: @bg-color;
  color: @font-color-light;

  @media screen and (max-width: 480px) {
    height: inherit;
    padding: 4vh;
  }

  & .animations {
    display: grid;
    grid-template: 1fr e('/') repeat(6, 1fr);
    grid-gap: 40px;

    @media screen and (max-width: 480px) {
      grid-template: 50px repeat(4, 1fr) e('/') 1fr;
    }
  }

  & h2 {
    width: 120px;
    margin: 0 auto;
    text-align: right;
  }
}
</style>
