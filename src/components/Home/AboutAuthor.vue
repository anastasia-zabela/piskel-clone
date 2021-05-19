<template>
  <article class="landing-page__about-author">
    <div>
      <h2>Contacts</h2>
      <h3>
        App developed by Anastasia Zabela for educational purposes during Rolling Scopes School
        course
      </h3>
      <div class="contacts-items">
        <a href="mailto:zabela113@mail.ru" target="_blank" rel="noopener noreferrer">
          <v-icon name="envelope" />
        </a>
        <a href="https://t.me/anastasiazabela" target="_blank" rel="noopener noreferrer">
          <v-icon name="brands/telegram-plane" />
        </a>
        <a
          href="https://www.instagram.com/anastasia.lion/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <v-icon name="brands/instagram" />
        </a>
        <a href="https://github.com/anastasia-zabela" target="_blank" rel="noopener noreferrer">
          <v-icon name="brands/github-alt" />
        </a>
        <a
          id="contact-cv"
          href="https://anastasia-zabela.github.io/rsschool-2019Q1-cv/"
          target="_blank"
          rel="noopener noreferrer"
        >
          CV
        </a>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'AboutAuthor',
};
</script>

<style lang="less" scoped>
.landing-page__about-author {
  padding: 30px 0;
  background: @color-2;
  text-align: center;

  & div {
    margin: auto;
    width: 500px;

    @media screen and (max-width: 480px) {
      width: 90vw;
    }
  }

  & h2 {
    text-transform: uppercase;
    margin: 20px 0;
  }

  & .contacts-items {
    margin: 20px auto;
    width: 300px;
    display: flex;
    justify-content: space-around;

    & a {
      text-decoration: none;
      font-size: 35px;
      color: @font-color-dark;

      &:hover {
        color: @color-3;
      }

      & svg {
        width: 4vh;
        height: 4vh;
      }
    }

    & #contact-cv {
      font-size: 15px;
      font-weight: bold;
      border: 3px solid @font-color-dark;
      border-radius: 8px;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        border-color: @color-3;
      }
    }
  }
}
</style>
