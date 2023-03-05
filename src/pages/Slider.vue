<template>
  <div class="container">
    <div ref="wrapperRef" class="wrapper">
      <div ref="dragElRef" />
      <div v-for="(card, i) in 6" :key="card.id" :ref="cardRef" class="card">
        <h1>{{ i + 1 }}th card</h1>
        <p>HELLO!</p>
      </div>
    </div>
    <svg ref="spinRef" class="spin" viewBox="0 0 213 46">
      <path
        fill="#fff"
        d="M189.894 10.1631c26 5.3981 6.696 16.4668-29.361 21.6732-7.385 1.0695-14.7 2.0583-23.533 2.6637v6.1246c10.179-.7366 18.84-2.0987 27.345-3.3095 52.397-7.4262 64.436-23.1968 26.722-29.72494C168.277 3.65509 139.5.5 115.76-.0000034 93.5559-.0403631 68.4533 1.17043 46.6978 4.41939-54.6268 19.5543 32.4902 39.825 82.9541 38.6949v7.0629L101.5 34.5 82.9541 23.0555v7.5372c-25.7582.1311-112.4956-8.7682-35.1177-23.46921C65.6929 3.73327 96.7993 2.97982 115.76 3c21.065.02018 54.259 3.03631 74.134 7.1631Z"
      />
    </svg>
    <p class="notice">Drag the card or arrow icon to move the 3D slider!</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

const spinRef = ref();
const dragElRef = ref();
const wrapperRef = ref();
const cardArray = ref([]);
const cardRef = (el) => cardArray.value.push(el);

let dragAmount = -3000;
let cardGap = 520;
let startProgress;
let draggableTrigger;
let spin;
let progressLimit = gsap.utils.wrap(0, 1);

const onResize = () => {
  cardGap = Math.min(window.innerWidth / 1.8, 520);

  if (matchMedia("(max-width: 480px)").matches) {
    dragAmount = -1500; // 모바일 드래그 양 조절
  }

  if (spin) {
    gsap.killTweensOf(spin);
    spin.timeScale(0);
    startProgress = spin.progress();
  }

  spin = gsap.fromTo(
    cardArray.value,
    {
      rotationY: (i) => (i * 360) / cardArray.value.length,
    },
    {
      rotationY: "+=360",
      transformOrigin: `50% 50% ${-cardGap}px`,
      duration: 50,
      ease: "none",
      repeat: -1,
    }
  );
  draggableTrigger = Draggable.create(dragElRef.value, {
    trigger: [wrapperRef.value, spinRef.value],
    allowNativeTouchScrolling: true,
    onPress() {
      gsap.killTweensOf(spin);
      spin.timeScale(0); // 애니메이션 중지
      startProgress = spin.progress();
    },
    onDrag() {
      let currentProgress = startProgress + (this.startX - this.x) / dragAmount;
      spin.progress(progressLimit(currentProgress));
    },
    onRelease() {
      if (!this.tween || !this.tween.isActive()) {
        gsap.to(spin, { timeScale: 1, duration: 1 });
      }
    },
  });
};

onMounted(() => {
  cardArray.value.reverse();
  onResize();
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  draggableTrigger.forEach((trigger) => trigger.kill());
  window.removeEventListener("resize", onResize);
});
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  max-width: 1920px;
  height: calc(var(--vh) * 100);
  background: rgb(55, 55, 55);
  overflow: hidden;
  .wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(0, -50%);
    height: 500px; // 시점
    transform-style: preserve-3d;
    perspective: 1200px;
    .card {
      position: absolute;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
      width: calc(var(--vh) * 25);
      height: calc(var(--vh) * 60);
      border: 2px solid #12dfd4;
      color: #12dfd4;
      background: transparent;
      text-align: center;
      overflow: hidden;
      cursor: pointer;
      &:hover {
        box-shadow: 0 0 20px 0 #00fff3;
      }
      h1 {
        font-size: 1.5em;
        margin-top: calc(var(--vh) * 2);
      }
      p {
        margin-top: calc(var(--vh) * 2);
      }
    }
  }
  .spin {
    position: absolute;
    bottom: calc(var(--vh) * 5);
    left: 50%;
    transform: translate(-50%, 0);
    width: 40%;
    opacity: 0.5;
    @media (max-width: 1280px) {
      width: 80%;
    }
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  .notice {
    position: absolute;
    bottom: calc(var(--vh) * 2);
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 1.3em;
    color: yellow;
    text-align: center;
    pointer-events: none;
    @media (max-width: 480px) {
      bottom: calc(var(--vh) * 1);
      font-size: 0.8em;
    }
  }
}
</style>
