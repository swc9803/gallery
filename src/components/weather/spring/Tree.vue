<template>
  <div class="trees">
    <img class="ltree3" src="@/assets/weather/ltree3.png" />
    <img class="rtree3" src="@/assets/weather/rtree3.png" />
    <img class="ltree2" src="@/assets/weather/ltree2.png" />
    <img class="rtree2" src="@/assets/weather/rtree2.png" />
    <img class="ltree1" src="@/assets/weather/ltree1.png" />
    <img class="rtree1" src="@/assets/weather/rtree1.png" />
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

let scrollTrigger1, scrollTrigger2;

onMounted(() => {
  const Tree = gsap.timeline();
  scrollTrigger1 = ScrollTrigger.create({
    animation: Tree,
    trigger: ".scrollElement",
    start: "5% top",
    end: "8% 100%",
    scrub: 2,
  });
  Tree.from(".trees", { opacity: 0 });
  Tree.from("#road", { opacity: 0 }, "<0.5");
  gsap.to(".ltree1", {
    rotate: 0.7,
    transformOrigin: "left bottom 100%",
    duration: 3,
    ease: "none",
    repeat: -1,
    yoyo: true,
  });
  gsap.to(".rtree1", {
    rotate: -0.7,
    transformOrigin: "right bottom 100%",
    delay: 3,
    duration: 3,
    ease: "none",
    repeat: -1,
    yoyo: true,
  });
  gsap.to(".ltree2", {
    rotate: 0.7,
    transformOrigin: "left center 100%",
    duration: 5,
    ease: "none",
    repeat: -1,
    yoyo: true,
  });
  gsap.to(".rtree2", {
    rotate: -0.7,
    transformOrigin: "right center 100%",
    delay: 2,
    duration: 5,
    ease: "none",
    repeat: -1,
    yoyo: true,
  });
  gsap.to(".ltree3", {
    rotate: 0.7,
    transformOrigin: "left center 100%",
    duration: 7,
    ease: "none",
    repeat: -1,
    yoyo: true,
  });
  gsap.to(".rtree3", {
    rotate: -0.7,
    transformOrigin: "right center 100%",
    delay: 2,
    duration: 7,
    ease: "none",
    repeat: -1,
    yoyo: true,
  });

  const lTreemove = gsap.timeline();
  scrollTrigger2 = ScrollTrigger.create({
    animation: lTreemove,
    trigger: ".scrollElement",
    start: "24% top",
    end: "29% 100%",
    scrub: 2,
  });
  lTreemove
    .to(".ltree1, .ltree2, .ltree3", 0, { xPercent: -5 })
    .to(".rtree1, .rtree2, .rtree3", 0, { xPercent: 5 }, 0)
    .to(".ltree1, .ltree2, .ltree3", { display: "none" })
    .to(".rtree1, .rtree2, .rtree3", { display: "none" });
});

onBeforeUnmount(() => {
  scrollTrigger1.kill();
  scrollTrigger2.kill();
});
</script>

<style scoped>
.ltree1,
.ltree2,
.ltree3,
.rtree1,
.rtree2,
.rtree3 {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
