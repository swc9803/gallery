<template>
  <Background class="spring wSpring" />
  <Tree class="spring wSpring" />
  <Birds class="spring wSpring" />
  <SpringText class="spring wSpring" />
</template>

<script setup>
import Background from "@/components/weather/spring/Background";
import Birds from "@/components/weather/spring/Birds";
import SpringText from "@/components/weather/spring/SpringText";
import Tree from "@/components/weather/spring/Tree";
import { onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

let scrollTrigger1, scrollTrigger2;

onMounted(() => {
  const Springon = gsap.timeline();
  scrollTrigger1 = ScrollTrigger.create({
    animation: Springon,
    trigger: ".scrollElement",
    start: "-1% top",
    end: "28% 100%",
    scrub: 0,
  });
  Springon.from(".wSpring", { display: "none" });

  const Springoff = gsap.timeline();
  scrollTrigger2 = ScrollTrigger.create({
    animation: Springoff,
    trigger: ".scrollElement",
    start: "28% top",
    end: "28% 100%",
    scrub: 0,
  });
  Springoff.to(".wSpring", { display: "none" });
});

onBeforeUnmount(() => {
  scrollTrigger1.kill();
  scrollTrigger2.kill();
});
</script>

<style scoped>
.spring {
  display: block;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
