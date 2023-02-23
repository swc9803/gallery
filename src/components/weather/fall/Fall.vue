<template>
  <Background class="fall" />
  <FallText class="fall" />
  <Reed class="fall" />
  <Leaf />
</template>

<script setup>
import Background from "@/components/weather/fall/Background";
import FallText from "@/components/weather/fall/FallText";
import Reed from "@/components/weather/fall/Reed";
import Leaf from "@/components/weather/fall/Leaf";
import { onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

let scrollTrigger;

onMounted(() => {
  scrollTrigger = ScrollTrigger.create({
    trigger: ".scrollElement",
    start: "55% top",
    end: "75% 100%",
    onEnter: () => {
      gsap.to(
        "#freed1, #freed2, #freed3, #freed4, #freed5, #freed6, #freed7, #freed8, #freed9, #reed1, #reed2, #reed3, #reed4, #reed5, #reed6, #reed7, #reed8, #reed9, #reed10, #reed11, #reed12, #reed13",
        { display: "block" }
      );
    },
    onLeaveBack: () => {
      gsap.to(
        "#freed1, #freed2, #freed3, #freed4, #freed5, #freed6, #freed7, #freed8, #freed9, #reed1, #reed2, #reed3, #reed4, #reed5, #reed6, #reed7, #reed8, #reed9, #reed10, #reed11, #reed12, #reed13",
        { display: "none" }
      );
    },
  });
});

onBeforeUnmount(() => {
  scrollTrigger.kill();
});
</script>

<style scoped>
.fall {
  display: block;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
