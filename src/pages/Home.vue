<template>
  <div id="home">
    <Main />
    <div class="card-flex">
      <Card ref="cardRef" />
      <Map @move-to-card="moveToCard" ref="mapRef" />
    </div>
    <footer :class="{ 'dark-mode': props.onDarkMode }">
      <p>You Can See All My Code in Here!</p>
      <div class="link">
        <div
          @click="goToGitHub"
          :class="{ 'dark-mode': props.onDarkMode }"
          class="btn"
        >
          GitHub
        </div>
        or
        <div
          @click="goToCodePen"
          :class="{ 'dark-mode': props.onDarkMode }"
          class="btn"
        >
          CodePen
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineProps } from "vue";
import Main from "@/components/Main.vue";
import Card from "@/components/Card.vue";
import Map from "@/components/Map.vue";

const props = defineProps({
  onDarkMode: Boolean,
});

const cardRef = ref();
const mapRef = ref();
let observer;

const goToGitHub = () => {
  open("https://github.com/swc9803");
};
const goToCodePen = () => {
  open("https://codepen.io/swc9803");
};

const moveToCard = (i) => {
  scrollTo({
    top:
      cardRef.value.cardArray[i].offsetTop -
      64 -
      (window.innerHeight - 64 - cardRef.value.cardArray[i].offsetHeight) * 0.5,
    behavior: "smooth",
  });
};

const mediaQuery480 = window.matchMedia("(max-width: 480px)");
const mediaQuery1280 = window.matchMedia("(max-width: 1280px)");
let threshold = 1;
const onResize = () => {
  if (mediaQuery480.matches) {
    threshold = 0.6;
  } else if (mediaQuery1280.matches) {
    threshold = 1;
  } else {
    threshold = 0.8;
  }
};

onMounted(() => {
  onResize();
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = cardRef.value.cardArray.indexOf(entry.target);
        if (index < mapRef.value.mapArray.length) {
          mapRef.value.mapArray[index].style.opacity = entry.isIntersecting
            ? 1
            : 0.5;
          mapRef.value.mapArray[index].style.filter = entry.isIntersecting
            ? "grayscale(0)"
            : "grayscale(90%)";
          mapRef.value.mapArray[index].style.transform = entry.isIntersecting
            ? "scale(1.2)"
            : "scale(1)";
        }
      });
    },
    {
      threshold: threshold,
    }
  );
  cardRef.value.cardArray.forEach((card) => {
    observer.observe(card);
  });

  setInterval(() => {
    console.log(threshold);
  }, 1000);

  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  observer.disconnect();
  window.removeEventListener("resize", onResize);
});
</script>

<style lang="scss">
#home {
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 60px;
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
  .card-flex {
    display: flex;
    justify-content: space-between;
    gap: 96px;
    @media (max-width: 1440px) {
      & {
        gap: 64px;
      }
    }
    @media (max-width: 1024px) {
      & {
        gap: 32px;
      }
    }
    @media (max-width: 768px) {
      & {
        gap: 24px;
      }
    }
    @media (max-width: 480px) {
      & {
        gap: 16px;
      }
    }
  }
  footer {
    margin-top: 128px;
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
      margin-top: 36px;
      gap: 12px;
      align-items: center;
    }
  }
}
</style>
