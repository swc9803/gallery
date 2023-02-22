<template>
  <div ref="contentsRef" class="cardContainer">
    <div
      v-for="card in cards"
      :key="card.id"
      :ref="cardsRef"
      class="cardWrapper"
    >
      <img class="thumbnail" :src="card.src" :alt="card.alt" />
      <div class="detail">
        <p class="title">{{ card.title }}</p>
        <p>with {{ card.skills }}</p>
        <div class="moveBtn">See This Project</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineExpose } from "vue";

const contentsRef = ref();

const cardArray = ref([]);
const cardsRef = (el) => cardArray.value.push(el);

defineExpose({
  cardArray,
});

const cards = [
  {
    src: require("@/assets/project/spotlight.webp"),
    title: "SpotLight",
    skills: "three.js, gsap",
    alt: "spot light",
  },
  {
    src: require("@/assets/project/doll.webp"),
    title: "Wind Up Doll",
    skills: "gsap, draggable",
    alt: "wind-up doll",
  },
  {
    src: require("@/assets/project/doll.webp"),
    title: "Four Seasons",
    skills: "gsap, scrollTrigger",
    alt: "",
  },
  {
    src: require("@/assets/project/doll.webp"),
    title: "",
    skills: "",
    alt: "",
  },
  {
    src: require("@/assets/project/doll.webp"),
    title: "",
    skills: "",
    alt: "",
  },
  {
    src: require("@/assets/project/doll.webp"),
    title: "",
    skills: "",
    alt: "",
  },
];

onMounted(() => {});

onBeforeUnmount(() => {});
</script>

<style lang="scss" scoped>
.cardContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 1.2s;
  margin-top: 128px;
  gap: 60px;
  .cardWrapper {
    position: relative;
    border-radius: 2em;
    box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.7);
    transition: 0.5s;
    overflow: hidden;
    @media (width >= 768px) {
      & {
        border-radius: 0.75em;
      }
    }
    .thumbnail {
      position: relative;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: 0.5s;
    }
    &:hover > .thumbnail {
      filter: brightness(25%);
      transform: scale(1.05);
    }
    &:hover > .detail {
      opacity: 1;
    }
    .detail {
      position: absolute;
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
