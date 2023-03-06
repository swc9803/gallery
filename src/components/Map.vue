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
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

const emit = defineEmits(["move-to-card"]);
const moveToCard = (i) => {
  emit("move-to-card", i);
};

let scrollTrigger;
let proxy = { skew: 0 };
let skew;
const clamp = gsap.utils.clamp(-35, 35);

onMounted(() => {
  const skewSetter = gsap.quickSetter(".map", "skewY", "deg");

  scrollTrigger = ScrollTrigger.create({
    onUpdate: (self) => {
      skew = matchMedia("(max-width: 480px)").matches
        ? clamp(self.getVelocity() / -50)
        : clamp(self.getVelocity() / -250);

      if (Math.abs(skew) > Math.abs(proxy.skew)) {
        proxy.skew = skew;
        gsap.to(proxy, {
          skew: 0,
          overwrite: true,
          duration: 0.7,
          ease: "power3",
          onUpdate: () => skewSetter(proxy.skew),
        });
      }
    },
  });

  gsap.set(".map", { transformOrigin: "center center", force3D: true });
});

onBeforeUnmount(() => {
  scrollTrigger.kill();
});
</script>

<style lang="scss" scoped>
.mapWrapper {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 100vh;
  padding-top: 64px;
  gap: 18px;
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
