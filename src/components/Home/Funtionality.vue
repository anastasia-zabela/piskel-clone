<template>
  <article class="landing-page__functionality">
    <div>
      <ul>
        <li>
          <div class="icon">
            <v-icon name="play-circle" />
          </div>
          <h3>Live preview</h3>
          <p>Check a preview of your animation in real time as you draw.</p>
        </li>
        <li>
          <div class="icon">
            <v-icon name="brands/google" />
          </div>
          <h3>Google Sign in</h3>
          <p>No need to remember yet another password, just use your Google account to sign in.</p>
        </li>
        <li>
          <div class="icon">
            <v-icon name="file-export" />
          </div>
          <h3>Export to GIF</h3>
          <p>Export your animated sprite to file system in .gif format</p>
        </li>
        <li>
          <div class="icon">
            <v-icon name="cloud-download-alt" />
          </div>
          <h3>Save your session</h3>
          <p>You can save your current session after sign in with google login</p>
        </li>
        <li>
          <div class="icon">
            <v-icon name="forward" />
          </div>
          <h3>Adjustable FPS</h3>
          <p>Customize fps parameter of final animation</p>
        </li>
        <li>
          <div class="icon">
            <v-icon name="pen-fancy" />
          </div>
          <h3>A lot of diffrent tools</h3>
          <p>The editor has 10 diffrent tools for your creative</p>
        </li>
      </ul>
    </div>
  </article>
</template>

<script>
export default {
  name: 'Functinality',
};
</script>

<style lang="less" scoped>
.landing-page__functionality {
  background: @color-3;

  & ul {
    padding: 4vh 0;
  }

  & li {
    display: grid;
    grid-template: 1fr 1fr e('/') 80px 1fr;
    width: 600px;
    height: 100px;
    margin: auto;

    @media screen and (max-width: 480px) {
      width: 80vw;
    }
  }

  & .icon {
    grid-area: 1 e('/') 1 e('/') -1 e('/') 2;
    display: flex;
    align-items: center;
    font-size: 50px;

    & svg {
      width: 5vh;
      height: 5vh;
    }
  }

  & h3 {
    display: flex;
    align-items: flex-end;
  }
}
</style>
