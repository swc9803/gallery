<template>
  <div id="home">
    <Main />
    <div class="card-flex">
      <Card />
      <Map />
    </div>
    <footer :class="{ 'dark-mode': props.onDarkMode }">
      <p>You Can See All My Code in Here!</p>
      <div class="link">
        <div>Github</div>
        or
        <div>CodePen</div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

import Main from "@/components/Main.vue";
import Card from "@/components/Card.vue";
import Map from "@/components/Map.vue";

const props = defineProps({
  onDarkMode: Boolean,
});
</script>

<style lang="scss">
#home {
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 60px;
  @media screen and (max-width: 1024px) {
    & {
      padding: 0 48px;
    }
  }
  @media screen and (max-width: 768px) {
    & {
      padding: 0 36px;
    }
  }
  @media screen and (max-width: 480px) {
    & {
      padding: 0 24px;
    }
  }
  .card-flex {
    display: flex;
    justify-content: space-between;
    gap: 96px;
    @media screen and (max-width: 1440px) {
      & {
        gap: 64px;
      }
    }
    @media screen and (max-width: 1024px) {
      & {
        gap: 32px;
      }
    }
    @media screen and (max-width: 768px) {
      & {
        gap: 24px;
      }
    }
    @media screen and (max-width: 480px) {
      & {
        gap: 16px;
      }
    }
  }
  footer {
    margin-top: 64px;
    padding-bottom: 64px;
    text-align: center;
    transition: 0.5s;
    &.dark-mode {
      color: white;
    }
    p {
      font-size: 1.1em;
    }
    .link {
      display: flex;
      justify-content: center;
      div {
        color: white;
        background: gray;
      }
    }
  }
}
</style>
