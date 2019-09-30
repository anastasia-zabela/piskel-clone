<template>
  <div class="landing-page">
    <AboutApp />
    <Examples />
    <Functionality />
    <AboutAuthor />
    <footer class="landing-page__footer">
      <p>Original idea by <a href="https://www.piskelapp.com/">piskelapp.com</a></p>
    </footer>
  </div>
</template>

<script>
import AboutApp from './AboutApp.vue';
import Examples from './Examples.vue';
import Functionality from './Funtionality.vue';
import AboutAuthor from './AboutAuthor.vue';

export default {
  name: 'Home',
  components: {
    AboutApp,
    Examples,
    Functionality,
    AboutAuthor,
  },
};
</script>

<style scoped lang="less">
  .landing-page {

    &__footer {
        height: 50px;
        display: flex;
        align-items: center;
        padding: 0 50px;
        background: #686b70;
        color: #e3decb;

        & a {
            text-decoration: none;
            color: #acc7cd;

            &:hover {
                color: #d6b87c;
            }
        }
    }
}
</style>
