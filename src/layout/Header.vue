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
          <div ref="emojiRef" class="sun">
            {{ props.onDarkMode ? "🌙" : "☀️" }}
          </div>
          {{ props.onDarkMode ? "#000" : "#FFF" }}
        </div>
      </div>
      <div class="toggleBtn">
        <div
          @click="toggle"
          :class="{ 'dark-mode': props.onDarkMode }"
          class="btn"
        >
          Menu
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineEmits, defineProps } from "vue";
import gsap from "gsap";

const headerRef = ref();
const navFlexRef1 = ref();
const navFlexRef2 = ref();
const emojiRef = ref();
const toggleOn = ref(false);

const emit = defineEmits(["change-theme"]);
const props = defineProps({
  onDarkMode: Boolean,
});

const toggleDarkMode = () => {
  gsap.fromTo(
    emojiRef.value,
    {
      scale: 1,
      rotate: 0,
    },
    {
      scale: 0,
      rotate: 360,
      duration: 0.3,
      ease: "none",
      onComplete: () => {
        emit("change-theme");
        gsap.fromTo(
          emojiRef.value,
          {
            scale: 0,
            rotate: 360,
          },
          {
            scale: 1,
            rotate: 0,
            duration: 0.3,
            ease: "none",
          }
        );
      },
    }
  );
};

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
  if (toggleOn.value) {
    // on
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
};

const onResize = () => {
  gsap.killTweensOf([headerRef.value, navFlexRef1.value, navFlexRef2.value]);
  if (!matchMedia("(max-width: 768px)").matches) {
    // pc
    gsap.set(headerRef.value, {
      height: 64,
    });
    gsap.set([navFlexRef1.value, navFlexRef2.value], {
      y: 0,
      xPercent: 0,
    });
  } else {
    // mobile
    if (toggleOn.value) {
      gsap.set([navFlexRef1.value, navFlexRef2.value], {
        y: 0,
        xPercent: -50,
      });
    } else {
      gsap.set([navFlexRef1.value, navFlexRef2.value], {
        y: -172,
        xPercent: -50,
      });
    }
  }
};

onMounted(() => {
  if (matchMedia("(max-width: 768px)").matches) {
    gsap.set([navFlexRef1.value, navFlexRef2.value], {
      y: -172,
    });
  }
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
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
  @media (max-width: 1024px) {
    & {
      padding: 0 48px;
    }
  }
  @media (max-width: 768px) {
    & {
      padding: 0 36px;
    }
  }
  @media (max-width: 480px) {
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
    @media (max-width: 768px) {
      & {
        align-items: stretch;
      }
    }
    .logo {
      line-height: 64px;
      transition: 0.5s;
      font-family: "Monaco";
      @media (max-width: 768px) {
        & {
          order: -1;
        }
      }
      &.dark-mode {
        color: white;
      }
    }
    .nav-flex {
      position: relative;
      display: inline-flex;
      gap: 12px;
      @media (max-width: 768px) {
        & {
          position: absolute;
          top: 16px;
          left: 50%;
          transform: translate3d(-50%, 0, 0);
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
      position: relative;
      margin-top: 21px;
      display: none;
      order: 2;
      @media (max-width: 768px) {
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
.sun {
  display: inline-block;
  transform-origin: center center;
}
</style>
