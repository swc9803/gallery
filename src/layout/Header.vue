<template>
  <header ref="headerRef">
    <div class="navColor" :class="{ 'dark-mode': props.onDarkMode }" />
    <nav>
      <div ref="navFlexRef1" class="nav-flex">
        <div
          @click="moveToPort"
          class="btn"
          :class="{ 'dark-mode': props.onDarkMode }"
        >
          Portfolio
        </div>
        <div
          @click="moveToGit"
          class="btn"
          :class="{ 'dark-mode': props.onDarkMode }"
        >
          Github
        </div>
      </div>
      <router-link to="/">
        <div class="logo" :class="{ 'dark-mode': props.onDarkMode }">Sung</div>
      </router-link>
      <div ref="navFlexRef2" class="nav-flex">
        <div
          @click="moveToCode"
          class="btn"
          :class="{ 'dark-mode': props.onDarkMode }"
        >
          CodePen
        </div>
        <div
          class="btn"
          :class="{ 'dark-mode': props.onDarkMode }"
          @click="toggleDarkMode"
        >
          {{ props.onDarkMode ? "🌙" : "☀️" }}
        </div>
      </div>
      <div @click="toggle" class="toggleBtn">🍔</div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineEmits, defineProps } from "vue";
import gsap from "gsap";

const emit = defineEmits(["change-theme"]);
const props = defineProps({
  onDarkMode: Boolean,
});

const toggleDarkMode = () => {
  emit("change-theme");
  // rotate+scale-, rotate-scale+ 해, 달 변경
};

const headerRef = ref();
const navFlexRef1 = ref();
const navFlexRef2 = ref();
const toggleOn = ref(false);

const moveToPort = () => {
  open("https://newsungpf.firebaseapp.com/");
};
const moveToGit = () => {
  open("https://github.com/swc9803");
};
const moveToCode = () => {
  open("https://codepen.io/swc9803");
};

const toggle = () => {
  toggleOn.value = !toggleOn.value;
  onResize();
};

const onResize = () => {
  if (!matchMedia("(max-width: 768px)").matches) {
    // pc
    gsap.set(headerRef.value, {
      height: 64,
    });
    gsap.set([navFlexRef1.value, navFlexRef2.value], {
      y: 0,
    });
  } else {
    // mobile
    if (toggleOn.value) {
      //on
      gsap.to(headerRef.value, {
        height: 172,
        duration: 0.5,
        ease: "none",
      });
      gsap.fromTo(
        [navFlexRef1.value, navFlexRef2.value],
        {
          y: -172,
        },
        {
          y: 0,
          duration: 0.5,
          ease: "none",
        }
      );
    } else {
      // off
      gsap.to(headerRef.value, {
        height: 64,
        duration: 0.5,
        ease: "none",
      });
      gsap.fromTo(
        [navFlexRef1.value, navFlexRef2.value],
        {
          y: 0,
        },
        {
          y: -172,
          duration: 0.5,
          ease: "none",
        }
      );
    }
  }
};

onMounted(() => {
  onResize();
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onResize);
});
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  width: 100%;
  height: 64px;
  padding: 0 60px;
  backdrop-filter: blur(8px);
  z-index: 9;
  @media (width <= 1024px) {
    & {
      padding: 0 48px;
    }
  }
  @media (width <= 768px) {
    & {
      padding: 0 36px;
    }
  }
  @media (width <= 480px) {
    & {
      padding: 0 24px;
    }
  }
  .navColor {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
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
    @media (width <= 768px) {
      & {
        align-items: stretch;
      }
    }
    .logo {
      line-height: 50px;
      transition: 0.5s;
      @media (width <= 768px) {
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
      position: relative;
      display: inline-flex;
      gap: 12px;
      @media (width <= 768px) {
        & {
          position: absolute;
          top: 16px;
          left: 50%;
          transform: translate(-50%, 0);
          flex-direction: column;
          gap: 12px;
          text-align: center;
          order: 1;
          &:nth-child(3) {
            top: 92px;
          }
        }
      }
    }
    .toggleBtn {
      display: none;
      line-height: 50px;
      order: 2;
      cursor: pointer;
      @media (width <= 768px) {
        & {
          display: block;
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
