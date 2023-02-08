<template>
  <div ref="contentsRef" class="cardContainer">
    <div v-for="card in cards" :key="card.id" class="cardWrapper">
      <img class="thumbnail" src="@/assets/test.jpg" alt="test" />
      <div class="detail">
        <p class="title">{{ card.title }}</p>
        <p>with {{ card.skills }}</p>
        <div class="moveBtn">See This Project</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const contentsRef = ref();
let originPos, newPos;
let skewAni;

const skewContent = () => {
  newPos = window.pageYOffset;
  const speed = (newPos - originPos) * 0.5;

  contentsRef.value.style.transform = `skewY(${speed}deg)`;

  originPos = newPos;
  skewAni = requestAnimationFrame(skewContent);
};

const cards = [
  { src: "", title: "Wind Up Doll", skills: "gsap, draggable" },
  { src: "", title: "SpotLight", skills: "three.js, gsap" },
  { src: "", title: "Four Seasons", skills: "gsap, scrollTrigger" },
  { src: "", title: "", skills: "" },
  { src: "", title: "", skills: "" },
  { src: "", title: "", skills: "" },
];

onMounted(() => {
  originPos = window.pageYOffset;
  skewContent();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(skewAni);
});
</script>

<style lang="scss" scoped>
.cardContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 1.2s;
  gap: 60px;
  .cardWrapper {
    position: relative;
    width: 100%;
    height: 400px;
    background: darkcyan; // 제거
    border-radius: 2em;
    transition: 0.5s;
    box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.7);
    overflow: hidden;
    &:hover > .thumbnail {
      filter: brightness(25%);
      transform: scale(1.05);
    }
    &:hover > .detail {
      opacity: 1;
    }
    .thumbnail {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: 0.5s;
      opacity: 0; // 제거
    }
    .detail {
      position: relative;
      left: 50%;
      transform: translate(-50%, 0);
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      text-align: center;
      opacity: 0;
      transition: 0.5s;
      gap: 50px;
      z-index: 1;
      color: white;
      .title {
        font-size: 1.1em;
      }
      .moveBtn {
        padding: 10px;
        background: linear-gradient(
          270deg,
          rgba(255, 255, 255, 0.8),
          rgba(255, 255, 255, 0.8),
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 0)
        );
        background-size: 300% 300%;
        border: 1px solid white;
        transition: 0.7s ease-out;
        cursor: pointer;
        &:hover {
          background-position: 100%;
          color: black;
        }
      }
    }
  }
}
</style>
