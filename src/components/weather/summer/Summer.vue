<template>
  <Remain />
  <Rain />
</template>

<script setup>
import Remain from "@/components/weather/summer/Remain";
import Rain from "@/components/weather/summer/Rain";
import { onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

let scrollTrigger1, scrollTrigger2;

onMounted(() => {
  const Summeron = gsap.timeline();
  scrollTrigger1 = ScrollTrigger.create({
    animation: Summeron,
    trigger: ".scrollElement",
    start: "26% top",
    end: "52% 100%",
    scrub: 0,
  });
  Summeron.from(".summer", { display: "none" });

  const Summeroff = gsap.timeline();
  scrollTrigger2 = ScrollTrigger.create({
    animation: Summeroff,
    trigger: ".scrollElement",
    start: "55% top",
    end: "55% 100%",
    scrub: 0,
  });
  Summeroff.to(".summer", { display: "none" });
});

onBeforeUnmount(() => {
  scrollTrigger1.kill();
  scrollTrigger2.kill();
});
</script>

<style scoped></style>
