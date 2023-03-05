<template>
  <div ref="contentsRef" class="mapWrapper">
    <div v-for="(map, i) in maps" :key="map.id" :ref="mapRef" class="map">
      <img @click="moveToCard(i)" :src="map.src" :alt="map.alt" />
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  defineEmits,
  defineExpose,
} from "vue";

const maps = [
  { src: require("@/assets/project/spotlight.webp"), alt: "spot light" },
  { src: require("@/assets/project/doll.webp"), alt: "wind-up doll" },
  { src: require("@/assets/project/seasons.webp"), alt: "four seasons" },
  { src: require("@/assets/project/slider.webp"), alt: "3d slider" },
  { src: require("@/assets/project/bed.webp"), alt: "bed" },
  { src: require("@/assets/project/sauce.webp"), alt: "sauce" },
];

const mapArray = ref([]);
const mapRef = (el) => mapArray.value.push(el);

defineExpose({
  mapArray,
});

const contentsRef = ref();
let skewAni;
let originPos,
  newPos = 0;
let speed = 0;

const skewContent = () => {
  if (Math.abs(speed) > 2) {
    speed += speed > 0 ? -2 : 2;
  } else {
    speed = 0;
  }

  speed = speed > 100 ? 0 : speed;

  if (Math.abs(speed) < 100) {
    contentsRef.value.style.transform = `skewY(${speed}deg)`;
  }

  originPos = newPos;
  skewAni = requestIdleCallback(skewContent);
};

const onScroll = () => {
  newPos = window.pageYOffset;
  if (matchMedia("(max-width: 480px)").matches) {
    speed = (newPos - originPos) * 1.5;
  } else {
    speed = (newPos - originPos) * 0.15;
  }
};

const emit = defineEmits(["move-to-card"]);
const moveToCard = (i) => {
  emit("move-to-card", i);
};

onMounted(() => {
  originPos = window.pageYOffset;
  skewContent();

  window.addEventListener("scroll", onScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  cancelIdleCallback(skewAni);
});
</script>

<style lang="scss" scoped>
.mapWrapper {
  position: sticky;
  top: 0;
  //   transform: skewY(1deg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 100vh;
  padding-top: 64px;
  gap: 18px;
  transition: transform 0.5s;
  @media (max-width: 768px) {
    & {
      width: 30%;
      gap: 25px;
    }
  }
  .map {
    width: 70%;
    border-radius: 1em;
    box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.7);
    overflow: hidden;
    cursor: pointer;
    transition: 0.4s ease-out;
    @media (max-width: 768px) {
      & {
        width: 100%;
        border-radius: 0.5em;
      }
    }
    img {
      position: relative;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
