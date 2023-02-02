<template>
  <header>
    <div class="navColor" :class="{ 'dark-mode': props.onDarkMode }" />
    <nav>
      <div class="nav-flex">
        <div class="btn" :class="{ 'dark-mode': props.onDarkMode }">Home</div>
        <div class="btn" :class="{ 'dark-mode': props.onDarkMode }">Github</div>
      </div>
      <div :class="{ 'dark-mode': props.onDarkMode }">Sung</div>
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

// const navItems = [
//   { name: "Home" },
//   { name: "Github" },
//   { name: "Portfolio" },
//   { name: props.onDarkMode ? "dark-mode" : "light-mode" },
// ];
</script>

<style lang="scss" scoped>
header {
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
      color: white;
      opacity: 0.5;
    }
  }
  position: fixed;
  width: 100%;
  height: 64px;
  //   font-size: 1.2em;
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
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    // @media screen and (max-width: 768px) {
    //   & {
    //     flex-direction: column;
    //   }
    // }
    .btn {
      padding: 3px 12px;
      border: 2px solid black;
      border-radius: 10em;
      cursor: pointer;
      &.dark-mode {
        border: 2px solid white;
      }
    }
    .nav-flex {
      display: flex;
      gap: 12px;
      //   @media screen and (max-width: 768px) {
      //     & {
      //       flex-direction: column;
      //       gap: 0;
      //     }
      //   }
    }
  }
}
</style>
