<template>
  <div class="layout" :class="{ 'dark-mode': onDarkMode }">
    <Header :onDarkMode="onDarkMode" @change-theme="changeTheme" />
    <router-view v-slot="{ Component }">
      <transition name="page">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Header from "@/layout/Header.vue";

const onDarkMode = ref(false);
const changeTheme = () => {
  onDarkMode.value = !onDarkMode.value;
  localStorage.setItem("onDarkMode", onDarkMode.value);
};

onMounted(() => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  window.addEventListener("resize", () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  // local storage
  const savedDarkMode = localStorage.getItem("onDarkMode");
  if (savedDarkMode) {
    onDarkMode.value = savedDarkMode === "true";
  }
});
</script>

<style lang="scss">
@import "@/assets/style.scss";

.dark-mode {
  background: black;
  color: white;
}
.layout {
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 100);
  transition: 0.5s;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
  //   transform: rotate3d(1, 1, 1, 15deg);
}
</style>
