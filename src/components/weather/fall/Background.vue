<template>
  <svg
    class="fallback"
    preserveAspectRatio="none"
    width="1920"
    height="1080"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 2000 1038"
  >
    <defs />
    <g id="reed" clip-path="url(#clip0)">
      <path id="fallbackground" fill="#FFF7AD" d="M0 0h2000v1037.5H0z" />
    </g>
    <defs>
      <clipPath id="clip0">
        <path fill="#fff" d="M0 0h2000v1037.5H0z" />
      </clipPath>
    </defs>
  </svg>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

let scrollTrigger;

onMounted(() => {
  const FallBack = gsap.timeline();
  scrollTrigger = ScrollTrigger.create({
    animation: FallBack,
    trigger: ".scrollElement",
    start: "50% top",
    end: "64% 100%",
    scrub: 2,
  });
  FallBack.from(".fallback", { opacity: 0 });
});

onBeforeUnmount(() => {
  scrollTrigger.kill();
});
</script>
