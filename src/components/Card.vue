<template>
  <div ref="contentsRef" class="card">
    <div v-for="box in boxes" :key="box.id" class="boxWrapper">
      <img class="thumbnail" src="@/assets/test.jpg" alt="test" />
      <div class="detail">
        <p class="title">title1</p>
        <div class="moveBtn">See This Project</div>
      </div>
    </div>
    <router-link to="about">about</router-link>
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

const boxes = [
  { src: "" },
  { src: "" },
  { src: "" },
  { src: "" },
  { src: "" },
  { src: "" },
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
.card {
  width: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 1s;
  gap: 60px;
  .boxWrapper {
    position: relative;
    width: 100%;
    height: 400px;
    background: darkcyan; // 제거
    border-radius: 2em;
    transition: 0.5s;
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
      .title {
        color: white;
      }
      .moveBtn {
        padding: 10px;
        color: white;
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
