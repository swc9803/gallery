<template>
  <div ref="contentsRef" class="mapWrapper">
    <!-- 이미지 포커스 시 스케일, alpha++, 글자 보이게 -->
    <div v-for="map in maps" :key="map.id" :ref="mapRef" class="map">
      map-card
    </div>
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

const mapArray = ref([]);
const mapRef = (el) => mapArray.value.push(el);

const contentsRef = ref();
let originPos, newPos;
let skewAni;

const skewContent = () => {
  newPos = window.pageYOffset;
  const speed = (newPos - originPos) * 10;

  mapArray.value.forEach((map) => {
    map.style.transform = `rotateX(${speed}deg)`;
  });
  //   contentsRef.value.style.transform = `skewY(${speed}deg)`;
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
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 100vh;
  padding-top: 64px;
  gap: 12px;
  opacity: 0.5;
  .map {
    width: 100%;
    height: 70px;
    object-fit: cover;
    background: blue;
    backface-visibility: hidden;
    transition: transform 1s;
  }
}
</style>
