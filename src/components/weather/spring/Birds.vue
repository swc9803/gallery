<template>
  <svg
    preserveAspectRatio="none"
    width="1920"
    height="1080"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 1012 525"
  >
    <defs />
    <g id="Spring">
      <g id="birds" fill="#000" fill-rule="evenodd" clip-rule="evenodd">
        <path
          id="bird3"
          d="M12.05 171.5c-3.7-.46-6.45-1.62-6.45-1.62s-4.05-2.96-4.47-5.88c3.97-1.26 6.72-.53 10.22.39l1.3.34 8.52 1.28c.53-1.14 1.72-3.27 3.31-3.6 1.5-.3 2.15-.1 2.98.18a10.46 10.46 0 002.77.57c.33.03.43.04.76.25.59.4-2.06 2.6-2.06 2.6a19.56 19.56 0 01-2.27 7.11c-.5.7-6.93 6.61-18.35 5.2l-4.33 1.48-2.82 2.56-.3-1.48s6.4-6.45 6.6-6.75c.07-.12 2.11-1.26 4.59-2.62z"
        />
        <path
          id="bird2"
          d="M64.1 137.22c-3.65-.74-6.3-2.1-6.3-2.1s-3.82-3.26-4.02-6.2c4.05-.96 6.74-.03 10.16 1.15l1.27.43 8.4 1.91c.62-1.09 1.97-3.13 3.57-3.34 1.53-.19 2.15.07 2.97.4.36.16.76.32 1.29.47.76.22 1.17.27 1.42.31.33.05.42.06.74.3.56.44-2.25 2.45-2.25 2.45a19.55 19.55 0 01-2.79 6.91c-.55.66-7.4 6.08-18.69 3.83l-4.43 1.15-3 2.34-.2-1.5s6.87-5.96 7.09-6.24c.08-.1 2.21-1.1 4.78-2.27z"
        />
        <path
          id="bird1"
          d="M96.05 162.5c-3.7-.46-6.45-1.62-6.45-1.62s-4.05-2.96-4.47-5.88c3.97-1.26 6.72-.53 10.22.39l1.3.34 8.52 1.28c.53-1.14 1.72-3.27 3.31-3.6 1.5-.3 2.15-.1 2.98.18a10.56 10.56 0 002.77.57c.33.03.43.04.76.25.59.4-2.06 2.6-2.06 2.6a19.57 19.57 0 01-2.27 7.11c-.5.7-6.93 6.61-18.35 5.2l-4.33 1.48-2.82 2.56-.3-1.48s6.4-6.45 6.6-6.75c.07-.12 2.11-1.26 4.59-2.62z"
        />
      </g>
    </g>
  </svg>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

let scrollTrigger;

onMounted(() => {
  const Birds = gsap.timeline();
  scrollTrigger = ScrollTrigger.create({
    animation: Birds,
    trigger: ".scrollElement",
    start: "9% top",
    end: "24% 100%",
    scrub: 2,
  });
  Birds.fromTo(
    "#birds",
    { xPercent: -100 },
    { xPercent: 1000, yPercent: -250 }
  );
});

onBeforeUnmount(() => {
  scrollTrigger.kill();
});
</script>

<style scoped>
#birds {
  transform: rotate(15deg);
}
</style>
