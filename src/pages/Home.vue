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
        <div>Github</div>
        or
        <div>CodePen</div>
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
  cardOffset: Number,
});

const cardRef = ref();
const mapRef = ref();
let observer;

const moveToCard = (i) => {
  scrollTo({
    top:
      cardRef.value.cardArray[i].offsetTop -
      64 -
      (window.innerHeight - 64 - cardRef.value.cardArray[i].offsetHeight) * 0.5,
    behavior: "smooth",
  });
};

onMounted(() => {
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
        }
      });
    },
    {
      threshold: 0.8,
    }
  );
  cardRef.value.cardArray.forEach((card) => {
    observer.observe(card);
  });
});

onBeforeUnmount(() => {
  observer.disconnect();
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
