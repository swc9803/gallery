<template>
  <div ref="contentsRef" class="mapWrapper">
    <!-- 이미지 포커스 시 스케일, alpha++, 글자 보이게 -->
    <div v-for="map in maps" :key="map.id" class="map">map-card</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const maps = [
  { src: "" },
  { src: "" },
  { src: "" },
  { src: "" },
  { src: "" },
  { src: "" },
];

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

onMounted(() => {
  originPos = window.pageYOffset;
  skewContent();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(skewAni);
});
</script>

<style lang="scss" scoped>
.mapWrapper {
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 100%;
  transition: transform 1s;
  gap: 12px;
  opacity: 0.5;
  .map {
    width: 100%;
    height: 50px;
    object-fit: cover;
    background: blue;
  }
}
</style>
