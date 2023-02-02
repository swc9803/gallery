<template>
  <header>
    <nav>
      <div>home</div>
      <div>github</div>
      <div>portfolio</div>
      <div @click="toggleDarkMode">
        {{ props.onDarkMode ? "dark-mode" : "light-mode" }}
        <!--해, 달 -->
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, defineEmits, defineProps, onMounted } from "vue";

const emit = defineEmits(["change-theme"]);
const onDarkMode = ref(true);
const props = defineProps({
  onDarkMode: Boolean,
});
const toggleDarkMode = () => {
  emit("change-theme");
  onDarkMode.value = !onDarkMode.value;
  // rotate+scale-, rotate-scale+ 해, 달 변경
};
onMounted(() => {
  const savedDarkMode = localStorage.getItem("onDarkMode");
  if (savedDarkMode) {
    onDarkMode.value = savedDarkMode === "true";
  }
});
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  width: 100%;
  height: 64px;
  line-height: 64px;
  background: transparent;
  padding: 0 60px;
  //   font-size: 1.3em;
  z-index: 9;
  backdrop-filter: blur(8px);
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
    div {
      border: 2px solid white;
    }
  }
}
</style>
