<template>
  <header>
    <div class="navColor" :class="{ 'dark-mode': props.onDarkMode }" />
    <nav>
      <div class="nav-flex">
        <div class="btn" :class="{ 'dark-mode': props.onDarkMode }">
          CodePen
        </div>
        <div class="btn" :class="{ 'dark-mode': props.onDarkMode }">Github</div>
      </div>

      <router-link to="/">
        <div class="logo" :class="{ 'dark-mode': props.onDarkMode }">Sung</div>
      </router-link>
      <div class="nav-flex">
        <div class="btn" :class="{ 'dark-mode': props.onDarkMode }">
          portfolio
        </div>
        <div
          class="btn"
          :class="{ 'dark-mode': props.onDarkMode }"
          @click="toggleDarkMode"
        >
          {{ props.onDarkMode ? "dark-mode" : "light-mode" }}
          <!-- 글자 크기 맞추기 -->
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const emit = defineEmits(["change-theme"]);
const props = defineProps({
  onDarkMode: Boolean,
});

const toggleDarkMode = () => {
  emit("change-theme");
  // rotate+scale-, rotate-scale+ 해, 달 변경
};
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  width: 100%;
  height: 64px;
  padding: 0 60px;
  backdrop-filter: blur(8px);
  z-index: 9;
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
  .navColor {
    position: absolute;
    left: 0;
    width: 100%;
    height: 64px;
    background: white;
    opacity: 0.7;
    transition: 0.5s;
    z-index: -1;
    &.dark-mode {
      background: black;
      opacity: 0.5;
    }
  }
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    .logo {
      transition: 0.5s;
      @media screen and (max-width: 768px) {
        & {
          order: -1;
        }
      }
      &.dark-mode {
        color: white;
      }
    }
    .btn {
      padding: 3px 12px;
      border: 1px solid black;
      border-radius: 10em;
      background: linear-gradient(
        270deg,
        rgba(0, 0, 0, 0.8),
        rgba(0, 0, 0, 0.8),
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0)
      );
      background-size: 300% 300%;
      transition: 0.3s ease-out;
      cursor: pointer;
      &:hover {
        background-position: 100%;
        color: white;
      }
      &.dark-mode {
        border: 1px solid white;
        color: white;
        background: linear-gradient(
          270deg,
          rgba(255, 255, 255, 0.8),
          rgba(255, 255, 255, 0.8),
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 0)
        );
        background-size: 300% 300%;
        &:hover {
          background-position: 100%;
          color: black;
        }
      }
    }
    .nav-flex {
      display: flex;
      gap: 12px;
      @media screen and (max-width: 768px) {
        & {
          display: inline-flex;
          position: absolute;
          left: 50%;
          transform: translate(-50%, 0);
          flex-direction: column;
          gap: 12px;
          text-align: center;
          &:nth-child(1) {
            // position: relative;
            margin-top: 170px;
          }
        }
      }
    }
    a {
      color: inherit;
      text-decoration: none;
    }
  }
}
</style>
